import { makeAutoObservable } from 'mobx';
import { Shift } from '../types/shift';
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
    if (!locationService.userLocation) {
      await locationService.getUserLocation();
    }

    if (!locationService.userLocation) {
      const errorMessage = locationService.error || 'Необходимо разрешить доступ к геолокации для поиска смен';
      this.setError(errorMessage);
      return;
    }

    try {
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
