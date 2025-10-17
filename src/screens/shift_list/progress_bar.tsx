import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../hooks/use_theme';

type Props = {
  currentWorkers: number;
  planWorkers: number;
  current: number;
  total: number;
  showPercentage?: boolean;
  style?: any;
};

export const ProgressBar = ({
  current,
  total,
  showPercentage = true,
  style,
  currentWorkers,
  planWorkers,
}: Props) => {
  const theme = useTheme();
  const percentage = Math.min((current / total) * 100, 100);
  const remaining = Math.max(total - current, 0);

  const getProgressColor = (): string => {
    if (percentage >= 100) {
      return theme.success;
    } else if (percentage >= 75) {
      return theme.warning;
    } else if (percentage >= 50) {
      return theme.info;
    } else {
      return theme.error;
    }
  };

  const getStatusText = (): string => {
    if (percentage >= 100) {
      return 'Заполнено';
    } else if (percentage >= 75) {
      return 'Почти заполнено';
    } else if (percentage >= 50) {
      return 'Набираем';
    } else {
      return 'Срочно нужны';
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.progressInfo}>
        <Text style={[styles.statusText, {color: getProgressColor()}]}>
          {getStatusText()}
        </Text>
        {showPercentage && (
          <Text style={[styles.percentageText, {color: theme.textSecondary}]}>
            {Math.round(percentage)}%
          </Text>
        )}
      </View>
      <View
        style={[
          styles.track,
          {
            backgroundColor: theme.divider,
          },
        ]}>
        <View
          style={[
            styles.progress,
            {
              width: `${percentage}%`,
              backgroundColor: getProgressColor(),
            },
          ]}
        />
      </View>
      <View style={styles.details}>
        <Text style={[styles.detailText, {color: theme.textSecondary}]}>
          Работников: {currentWorkers}/{planWorkers}
        </Text>
        <Text style={[styles.detailText, {color: theme.textSecondary}]}>
          Осталось мест: {remaining}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '500',
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 11,
    fontStyle: 'italic',
  },
});
