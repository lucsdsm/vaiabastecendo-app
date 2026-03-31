import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { ThemeProvider, useAppTheme } from './src/theme/ThemeProvider';

import LoadingScreen from './src/components/LoadingScreen';
import Header from './src/components/Header';

import { useFonts, StoryScript_400Regular } from '@expo-google-fonts/story-script';

/**
 * Componente raiz do app.
 * Carrega fontes antes de montar a interface para evitar flicker visual.
 */
export default function App() {

  const [fontsLoaded] = useFonts({
    StoryScript_400Regular,
  });

  const [isAppReady, setIsAppReady] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AppContent />
      {/* Overlay temporario de splash controlado pelo estado local da aplicacao. */}
      {!isAppReady && (
        <LoadingScreen onFinish={() => setIsAppReady(true)} />
      )}
    </ThemeProvider>
  );
}

/**
 * Conteudo principal da tela com tema dinamico.
 */
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
