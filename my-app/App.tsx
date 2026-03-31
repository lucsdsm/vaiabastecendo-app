import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, useAppTheme } from './src/theme/ThemeProvider';
import Header from './src/components/Header';

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { colors, isDark } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <Header />

      <View style={styles.content}>
        <Text style={{ color: colors.textPrimary }}> {isDark ? '🌙' : '☀️'} </Text>
        
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
