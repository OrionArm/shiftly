import { makeAutoObservable } from 'mobx';
import { Shift, Location } from '../types/shift';
import { shiftService } from '../services/shift_service';
import { locationService } from '../services/location_service';

export class ShiftStore {
  shifts: Shift[] = [];
  selectedShift: Shift | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadShifts(): Promise<void> {
    console.log('🔍 loadShifts вызван');
    console.log('🔍 userLocation в loadShifts:', locationService.userLocation);

    if (!locationService.userLocation) {
      console.log('🔍 userLocation отсутствует, получаем геолокацию...');
      await locationService.getUserLocation();
    }

    if (!locationService.userLocation) {
      console.log(
        '❌ userLocation все еще отсутствует после попытки получения',
      );
      this.setError('Необходимо разрешить доступ к геолокации для поиска смен');
      return;
    }

    try {
      console.log(
        '✅ Загружаем смены для координат:',
        locationService.userLocation,
      );
      this.setLoading(true);
      this.clearError();
      const fetchedShifts = await shiftService.getShiftsByLocation(
        locationService.userLocation.latitude,
        locationService.userLocation.longitude,
      );
      this.setShifts(fetchedShifts);
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      this.setLoading(false);
    }
  }

  private setShifts(shifts: Shift[]) {
    this.shifts = shifts;
  }

  private setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  private setError(error: string | null) {
    this.error = error;
  }

  private clearError() {
    this.error = null;
  }
}
