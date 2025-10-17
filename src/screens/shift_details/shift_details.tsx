import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
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
          <View style={styles.headerContainer}>
            {shift.logo && (
              <Image source={{ uri: shift.logo }} style={styles.logo} />
            )}
            <View style={styles.headerText}>
              <Text style={[styles.title, { color: theme.text }]}>
                {shift.companyName || 'Название компании'}
              </Text>
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                Детали смены
              </Text>
            </View>
          </View>
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
            {`${shift.timeStartByCity || '09:00'} - ${shift.timeEndByCity || '17:00'}`}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Дата</Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            {shift.dateStartByCity || 'Сегодня'}
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
            {shift.address || 'Адрес не указан'}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Тип работ
          </Text>
          {shift.workTypes &&
          Array.isArray(shift.workTypes) &&
          shift.workTypes.length > 0 ? (
            <View>
              {shift.workTypes.map((workType, index) => (
                <Text
                  key={workType?.id || index}
                  style={[styles.infoText, { color: theme.textSecondary }]}>
                  • {workType?.name || 'Неизвестный тип работ'}
                </Text>
              ))}
            </View>
          ) : (
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              Тип работ не указан
            </Text>
          )}
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Количество рабочих
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            {`${Number(shift.currentWorkers) || 0} из ${Number(shift.planWorkers) || 0} человек`}
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Оплата
          </Text>
          <Text style={[styles.priceText, { color: theme.text }]}>
            {Number(shift.priceWorker) || 0} ₽ за смену
          </Text>
          {Number(shift.bonusPriceWorker) > 0 && (
            <Text style={[styles.bonusText, { color: theme.primary }]}>
              + {Number(shift.bonusPriceWorker)} ₽ бонус
            </Text>
          )}
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Рейтинг работодателя
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={[styles.ratingText, { color: theme.text }]}>
              {`⭐ ${Number(shift.customerRating) || 0}/5`}
            </Text>
            <Text style={[styles.feedbackText, { color: theme.textSecondary }]}>
              {shift.customerFeedbacksCount || '0 отзывов'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => {
            console.log('Запись на смену');
          }}>
          <Text style={[styles.buttonText, { color: theme.textOnDark }]}>
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
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
  priceText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bonusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  feedbackText: {
    fontSize: 14,
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
