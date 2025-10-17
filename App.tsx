import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useTheme} from './src/hooks/use_theme';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const barStyle = isDarkMode ? 'light-content' : 'dark-content';
  const theme = useTheme();

  const backgroundStyle = {
    backgroundColor: theme.background,
  };

  const headerStyle = {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.border,
  };

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar barStyle={barStyle} backgroundColor={theme.background} />
      <View style={headerStyle}>
        <Text
          style={[
            styles.headerTitle,
            {
              color: theme.text,
            },
          ]}>
          Shiftly
        </Text>
        <Text
          style={[
            styles.headerSubtitle,
            {
              color: theme.textSecondary,
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
