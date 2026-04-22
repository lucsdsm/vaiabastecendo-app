import React, { useState } from 'react';
import { useFonts, StoryScript_400Regular } from '@expo-google-fonts/story-script';

import { ThemeProvider } from './src/theme/ThemeProvider';
import LoadingScreen from './src/components/LoadingScreen';
import HomeScreen from './src/screens/Home';

import { ToastProvider } from './src/contexts/ToastContext';
import { Toast } from './src/components/Toast';

import { AuthProvider } from './src/contexts/AuthContext';
import { CombustivelProvider } from './src/contexts/CombustivelContext';

export default function App() {
  const [fontsLoaded] = useFonts({ StoryScript_400Regular });
  const [isAppReady, setIsAppReady] = useState(false);

  // Só renderiza o app quando a fonte nativa estiver pronta
  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CombustivelProvider>
            <HomeScreen />
          </CombustivelProvider>
        </AuthProvider>
        <Toast />
      </ToastProvider>
      
      {!isAppReady && <LoadingScreen onFinish={() => setIsAppReady(true)} />}
    </ThemeProvider>
  );
}