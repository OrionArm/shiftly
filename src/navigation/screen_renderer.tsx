import React from 'react';
import { ShiftListScreen } from '../screens/shift_list/shift_list';
import { ShiftDetailsScreen } from '../screens/shift_details/shift_details';
import { Screen } from './use_navigation';

type Props = {
  currentScreen: Screen;
  selectedShift: any;
  onNavigateToShiftList: () => void;
  onNavigateToShiftDetails: (shift: any) => void;
};

export const ScreenRenderer = ({
  currentScreen,
  selectedShift,
  onNavigateToShiftDetails,
}: Props) => {
  switch (currentScreen) {
    case 'ShiftDetails':
      console.log('Rendering ShiftDetailsScreen');
      return <ShiftDetailsScreen shift={selectedShift} />;
    case 'ShiftList':
      console.log('Rendering ShiftListScreen');
      return <ShiftListScreen onNavigateToDetails={onNavigateToShiftDetails} />;
    default:
      console.log('Rendering default ShiftListScreen');
      return <ShiftListScreen onNavigateToDetails={onNavigateToShiftDetails} />;
  }
};
