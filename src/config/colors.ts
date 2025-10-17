export const colors = {
  light: {
    // Основные цвета
    primary: '#007AFF',
    primaryDark: '#0056CC',
    primaryLight: '#B3D9FF',

    // Вторичные цвета
    secondary: '#FF9800',
    secondaryDark: '#F57C00',
    secondaryLight: '#FFE0B2',

    // Фоновые цвета
    background: '#f5f5f5',
    surface: '#ffffff',

    // Текстовые цвета
    text: '#333333',
    textSecondary: '#666666',
    textTertiary: '#999999',

    // Границы и разделители
    border: '#e0e0e0',
    divider: '#f0f0f0',
  },
  dark: {
    // Основные цвета
    primary: '#0A84FF',
    primaryDark: '#0056CC',
    primaryLight: '#4A9EFF',

    // Вторичные цвета
    secondary: '#FF9800',
    secondaryDark: '#F57C00',
    secondaryLight: '#FFE0B2',

    // Фоновые цвета
    background: '#1a1a1a',
    surface: '#2c2c2e',

    // Текстовые цвета
    text: '#ffffff',
    textSecondary: '#cccccc',
    textTertiary: '#999999',

    // Границы и разделители
    border: '#3a3a3c',
    divider: '#2a2a2c',
  },
} as const;

export type Colors = typeof colors;
export type ThemeColors = typeof colors.light;
