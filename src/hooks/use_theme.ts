import {useColorScheme} from 'react-native';
import {AppConfig} from '../config/app';
import {ThemeColors} from '../config/colors';

export const useTheme = (): ThemeColors => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return AppConfig.theme[isDark ? 'dark' : 'light'];
};
