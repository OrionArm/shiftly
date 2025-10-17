import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {AppConfig} from './src/config/app';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? AppConfig.theme.dark.background
      : AppConfig.theme.light.background,
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={AppConfig.theme.light.primary}
      />
      <View style={styles.header}>
        <Text
          style={[
            styles.headerTitle,
            {
              color: isDarkMode
                ? AppConfig.theme.dark.text
                : AppConfig.theme.light.text,
            },
          ]}>
          Shiftly
        </Text>
        <Text
          style={[
            styles.headerSubtitle,
            {
              color: isDarkMode
                ? AppConfig.theme.dark.textSecondary
                : AppConfig.theme.light.textSecondary,
            },
          ]}>
          Управление сменами
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: AppConfig.theme.light.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
});

export default App;
