import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../hooks/use_theme';
import type { Shift } from '../../types/shift';

type Props = {
  shift: Shift;
};

export const ShiftDetailsScreen = ({ shift }: Props) => {
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}>
          <Text style={[styles.title, { color: theme.text }]}>
            {shift?.companyName || 'Название компании'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Детали смены
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Время работы
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            {shift?.timeStartByCity || '09:00'} -{' '}
            {shift?.timeEndByCity || '17:00'}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Дата</Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            {shift?.dateStartByCity || 'Сегодня'}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Адрес
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            {shift?.address || 'Адрес не указан'}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => {
            console.log('Запись на смену');
          }}>
          <Text style={[styles.buttonText, { color: theme.text }]}>
            Записаться на смену
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
