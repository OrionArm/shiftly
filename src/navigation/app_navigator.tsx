import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from './use_navigation';
import { Header } from '../components/header';
import { ScreenRenderer } from './screen_renderer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function AppNavigator() {
  const { currentScreen, selectedShift, navigateToShiftDetails, goBack } =
    useNavigation();

  const headerTitle = currentScreen === 'ShiftDetails' ? 'Детали смены' : '';
  const showBackButton = currentScreen === 'ShiftDetails';

  return (
    <View style={styles.container}>
      <Header
        title={headerTitle}
        onBack={showBackButton ? goBack : undefined}
      />
      <ScreenRenderer
        currentScreen={currentScreen}
        selectedShift={selectedShift}
        onNavigateToShiftList={goBack}
        onNavigateToShiftDetails={navigateToShiftDetails}
      />
    </View>
  );
}
