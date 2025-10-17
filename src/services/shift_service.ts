import {Shift} from '../types/shift';

const API_BASE_URL = 'https://mobile.handswork.pro/api';

export const shiftService = {
  async getShiftsByLocation(
    latitude: number,
    longitude: number,
  ): Promise<Shift[]> {
    try {
      console.log(
        'Fetching shifts from API:',
        `${API_BASE_URL}/shifts/map-list-unauthorized?latitude=${latitude}&longitude=${longitude}`,
      );

      const response = await fetch(
        `${API_BASE_URL}/shifts/map-list-unauthorized?latitude=${latitude}&longitude=${longitude}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      return responseData.data || [];
    } catch (error) {
      console.error('Error fetching shifts:', error);
      throw new Error('Не удалось загрузить список смен');
    }
  },
};
