import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ThemeColors} from '../../config/colors';
import {ProgressBar} from './progress_bar';

type Props = {
  item: any;
  theme: ThemeColors;
  onPress: () => void;
};

export const ShiftItem = ({item, theme, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.item,
        {backgroundColor: theme.surface, borderColor: theme.border},
      ]}
      onPress={onPress}
      activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={[styles.companyName, {color: theme.text}]}>
          {item.companyName}
        </Text>
      </View>
      <Text style={[styles.address, {color: theme.textSecondary}]}>
        {item.address}
      </Text>
      <Text style={[styles.dateTime, {color: theme.primary}]}>
        {item.dateStartByCity} • {item.timeStartByCity} - {item.timeEndByCity}
      </Text>
      <Text style={[styles.price, {color: theme.secondary}]}>
        {item.priceWorker} ₽
      </Text>
      <View style={styles.progressSection}>
        <ProgressBar
          current={item.currentWorkers}
          total={item.planWorkers}
          style={styles.progressBar}
          currentWorkers={item.currentWorkers}
          planWorkers={item.planWorkers}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    transform: [{scale: 1}],
  },
  header: {
    marginBottom: 4,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    marginBottom: 8,
  },
  dateTime: {
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  workers: {
    fontSize: 14,
  },
  progressSection: {
    marginTop: 8,
  },
  progressBar: {
    marginTop: 6,
  },
});
