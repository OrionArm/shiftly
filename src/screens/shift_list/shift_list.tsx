import React, { useEffect, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { shiftStore } from '../../stores';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/use_theme';
import { ShiftItem } from './shift_item';
import { Shift } from '../../types/shift';

type Props = {
  onNavigateToDetails: (shift: Shift) => void;
};

export const ShiftListScreen = observer(({ onNavigateToDetails }: Props) => {
  const { shifts } = shiftStore;
  const theme = useTheme();

  useEffect(() => {
    shiftStore.loadShifts();
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Shift }) => (
      <ShiftItem
        item={item}
        theme={theme}
        onPress={() => onNavigateToDetails(item)}
      />
    ),
    [theme, onNavigateToDetails],
  );

  const keyExtractor = useCallback((item: Shift) => item.id, []);

  const ListEmptyComponent = useCallback(
    () => (
      <View
        style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
          Смены не найдены
        </Text>
      </View>
    ),
    [theme.background, theme.textSecondary],
  );

  const contentContainerStyle = useMemo(
    () =>
      shifts.length === 0
        ? [styles.centerContainer, { backgroundColor: theme.background }]
        : styles.listContent,
    [shifts.length, theme.background],
  );

  const flatListStyle = useMemo(
    () => ({ backgroundColor: theme.background }),
    [theme.background],
  );

  if (shiftStore.isLoading) {
    return (
      <View
        style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Загрузка смен...
        </Text>
      </View>
    );
  }

  if (shiftStore.error) {
  
    
    return (
      <View
        style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.error }]}>
          Ошибка: {shiftStore.error}
        </Text>
        
        <TouchableOpacity
          style={[styles.retryButton, { backgroundColor: theme.primary }]}
          onPress={() => shiftStore.loadShifts()}
          disabled={shiftStore.isLoading}>
          <Text style={[styles.retryButtonText, { color: theme.background }]}>
            {shiftStore.isLoading ? 'Повторная попытка...' : 'Повторить попытку'}
          </Text>
        </TouchableOpacity>
        
      
      </View>
    );
  }

  return (
    <FlatList
      data={shifts}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={contentContainerStyle}
      style={flatListStyle}
      showsVerticalScrollIndicator={true}
    />
  );
});

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },

});
