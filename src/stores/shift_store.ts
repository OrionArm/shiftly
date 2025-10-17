import {makeAutoObservable} from 'mobx';
import {Shift, Location} from '../types/shift';
import {shiftService} from '../services/shift_service';

export class ShiftStore {
  shifts: Shift[] = [];
  selectedShift: Shift | null = null;
  userLocation: Location | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setShifts(shifts: Shift[]) {
    this.shifts = shifts;
  }

  setSelectedShift(shift: Shift | null) {
    this.selectedShift = shift;
  }

  setUserLocation(location: Location) {
    this.userLocation = location;
  }

  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setError(error: string | null) {
    this.error = error;
  }

  clearError() {
    this.error = null;
  }

  async loadShifts(): Promise<void> {
    // TODO: заменить на реальную геолокацию
    this.setUserLocation({latitude: 45.039268, longitude: 38.987221});

    if (!this.userLocation) return;
    try {
      this.setLoading(true);
      this.clearError();
      const fetchedShifts = await shiftService.getShiftsByLocation(
        this.userLocation.latitude,
        this.userLocation.longitude,
      );
      this.setShifts(fetchedShifts);
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Ошибка загрузки');
    } finally {
      this.setLoading(false);
    }
  }
}
