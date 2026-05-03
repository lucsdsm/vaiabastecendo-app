import React, { useState } from 'react';
// import { useFonts, GoogleSans_400Regular, GoogleSans_500Medium, GoogleSans_700Bold } from '@expo-google-fonts/google-sans';

import { ThemeProvider } from './src/theme/ThemeProvider';
import LoadingScreen from './src/components/LoadingScreen';
import HomeScreen from './src/screens/Home';

import { ToastProvider } from './src/contexts/ToastContext';
import { Toast } from './src/components/Toast';

import { AuthProvider } from './src/contexts/AuthContext';
import { CombustivelProvider } from './src/contexts/CombustivelContext';

export default function App() {
  // const [fontsLoaded] = useFonts({ 
  //   GoogleSans_400Regular,
  //   GoogleSans_500Medium,
  //   GoogleSans_700Bold
  // });
  const [isAppReady, setIsAppReady] = useState(false);

  // Só renderiza o app quando a fonte nativa estiver pronta
  // if (!fontsLoaded) return null;

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