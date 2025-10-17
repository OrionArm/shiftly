import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/use_theme';

type Props = {
  title: string;
  onBack?: () => void;
};

export const Header = ({ title, onBack }: Props) => {
  const theme = useTheme();
  return title ? (
    <View style={styles.header}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: theme.textOnDark }]}>
            ← Назад
          </Text>
        </TouchableOpacity>
      )}
      <Text style={[styles.headerTitle, { color: theme.textOnDark }]}>
        {title}
      </Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 70,
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    borderBottomColor: '#0056CC',
  },
  backButton: {
    marginRight: 12,
    padding: 8,
    position: 'absolute',
    left: 16,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
