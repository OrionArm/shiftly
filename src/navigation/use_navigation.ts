import { useState, useCallback, useMemo } from 'react';

export type Screen = 'ShiftList' | 'ShiftDetails';

export const useNavigation = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('ShiftList');
  const [selectedShift, setSelectedShift] = useState<any>(null);

  const navigateToShiftList = useCallback(() => {
    setCurrentScreen('ShiftList');
  }, []);

  const navigateToShiftDetails = useCallback((shift: any) => {
    setSelectedShift(shift);
    setCurrentScreen('ShiftDetails');
  }, []);

  const goBack = useCallback(() => {
    if (currentScreen === 'ShiftDetails') {
      setCurrentScreen('ShiftList');
    }
  }, [currentScreen]);

  return {
    currentScreen,
    selectedShift,
    navigateToShiftList,
    navigateToShiftDetails,
    goBack,
  };
};
