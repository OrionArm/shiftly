import Geolocation from '@react-native-community/geolocation';
import { Location } from '../types/shift';
import { Platform, PermissionsAndroid } from 'react-native';

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
    console.log('🔍 LocationService: getUserLocation вызван');
    console.log('🔍 isLocationLoading:', this.isLocationLoading);
    console.log('🔍 userLocation:', this.userLocation);

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

      return new Promise(resolve => {
        Geolocation.getCurrentPosition(
          position => {
            const location: Location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            resolve({ location });
          },
          error => {
            let errorMessage = 'Ошибка получения геолокации';

            if (error.code === 1) {
              errorMessage = 'Пользователь отказал в доступе к геолокации';
            } else if (error.code === 2) {
              errorMessage = 'Ошибка определения местоположения';
            } else if (error.code === 3) {
              errorMessage = 'Превышено время ожидания получения геолокации';
            } else if (error.message) {
              errorMessage = error.message;
            }

            resolve({
              location: null,
              error: errorMessage,
            });
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      });
    } catch (error) {
      return {
        location: null,
        error: error instanceof Error ? error.message : 'Неизвестная ошибка',
      };
    }
  }
}

export const locationService = new LocationService();
