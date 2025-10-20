import Geolocation from '@react-native-community/geolocation';
import { Location } from '../types/shift';
import { Platform, PermissionsAndroid, Alert, Linking } from 'react-native';

export interface LocationPermissionResult {
  granted: boolean;
  error?: string;
}

export interface LocationResult {
  location: Location | null;
  error?: string;
}

class LocationService {
  userLocation: Location | null = null;
  locationPermissionGranted = false;
  isLocationLoading = false;
  error: string | null = null;

  async getUserLocation(): Promise<void> {
    if (this.isLocationLoading || this.userLocation) return;

    try {
      this.setLocationLoading(true);
      this.clearError();

      const result = await this.getCurrentLocation();

      if (result.location) {
        this.setUserLocation(result.location);
        this.setLocationPermissionGranted(true);
      } else {
        this.setError(result.error || 'Не удалось получить геолокацию');
        this.setLocationPermissionGranted(false);
      }
    } catch (err) {
      this.setError(
        err instanceof Error ? err.message : 'Ошибка получения геолокации',
      );
      this.setLocationPermissionGranted(false);
    } finally {
      this.setLocationLoading(false);
    }
  }

  async retryGetUserLocation(): Promise<void> {
    this.userLocation = null;
    this.locationPermissionGranted = false;
    this.error = null;
    
    if (Platform.OS === 'ios') {
      const hasPermission = await this.checkIOSPermissionStatus();
      if (!hasPermission) {
        this.showSettingsAlert();
        return;
      }
    }
    
    await this.getUserLocation();
  }

  private async checkIOSPermissionStatus(): Promise<boolean> {
    const result = await this.getPosition({
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    });
    if ('location' in result) return true;
    return result.errorCode !== 1; 
  }

  private showSettingsAlert(): void {
    Alert.alert(
      'Доступ к геолокации запрещен',
      'Для поиска смен поблизости необходимо разрешить доступ к геолокации в настройках приложения.',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Открыть настройки',
          onPress: () => this.openAppSettings(),
        },
      ]
    );
  }

  private async openAppSettings(): Promise<void> {
    try {
      if (Platform.OS === 'ios') {
        await Linking.openURL('app-settings:');
      } else {
        await Linking.openSettings();
      }
    } catch (error) {
      console.log('❌ Ошибка открытия настроек:', error);
    }
  }


  private setUserLocation(location: Location | null) {
    this.userLocation = location;
  }

  private setLocationPermissionGranted(granted: boolean) {
    this.locationPermissionGranted = granted;
  }

  private setLocationLoading(loading: boolean) {
    this.isLocationLoading = loading;
  }

  private setError(error: string | null) {
    this.error = error;
  }

  private clearError() {
    this.error = null;
  }

  private async requestPermission(): Promise<LocationPermissionResult> {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);

        const fineLocationStatus =
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];
        const coarseLocationStatus =
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION];

        const hasPermission =
          fineLocationStatus === PermissionsAndroid.RESULTS.GRANTED ||
          coarseLocationStatus === PermissionsAndroid.RESULTS.GRANTED;

        if (hasPermission) {
          return { granted: true };
        } else {
          return {
            granted: false,
            error: 'Пользователь отказал в доступе к геолокации',
          };
        }
      } else {
        // Для iOS разрешение запрашивается автоматически при вызове getCurrentPosition
        // Поэтому просто возвращаем true
        return { granted: true };
      }
    } catch (error) {
      return {
        granted: false,
        error:
          error instanceof Error ? error.message : 'Ошибка запроса разрешения',
      };
    }
  }

  private async getCurrentLocation(): Promise<LocationResult> {
    try {
      const permissionResult = await this.requestPermission();
      
      if (!permissionResult.granted) {
        return {
          location: null,
          error: permissionResult.error,
        };
      }

      const positionResult = await this.getPosition({
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      });

      if ('location' in positionResult) {
        return { location: positionResult.location };
      }

      return {
        location: null,
        error: this.mapGeolocationError(positionResult.errorCode, positionResult.message),
      };
    } catch (error) {
      return {
        location: null,
        error: error instanceof Error ? error.message : 'Неизвестная ошибка',
      };
    }
  }

  private async getPosition(options: {
    enableHighAccuracy: boolean;
    timeout: number;
    maximumAge: number;
  }): Promise<{ location: Location } | { errorCode: number; message?: string }> {
    return new Promise(resolve => {
      Geolocation.getCurrentPosition(
        position => {
          resolve({
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
        },
        error => {
          resolve({ errorCode: error.code, message: error.message });
        },
        options,
      );
    });
  }

  private mapGeolocationError(errorCode: number, message?: string): string {
    if (errorCode === 1) {
      return 'Пользователь отказал в доступе к геолокации';
    }
    if (errorCode === 2) {
      return 'Ошибка определения местоположения';
    }
    if (errorCode === 3) {
      if (message && message.includes('Unable to fetch location')) {
        return 'Не удалось получить геолокацию. Проверьте, что разрешение на геолокацию предоставлено в настройках устройства.';
      }
      return 'Превышено время ожидания получения геолокации';
    }
    return message || 'Ошибка получения геолокации';
  }
}

export const locationService = new LocationService();
