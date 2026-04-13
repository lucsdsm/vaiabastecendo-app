import React, { useState } from 'react';
import { useFonts, StoryScript_400Regular } from '@expo-google-fonts/story-script';

import { ThemeProvider } from './src/theme/ThemeProvider';
import LoadingScreen from './src/components/LoadingScreen';
import HomeScreen from './src/screens/Home';

export default function App() {
  const [fontsLoaded] = useFonts({ StoryScript_400Regular });
  const [isAppReady, setIsAppReady] = useState(false);

  // Só renderiza o app quando a fonte nativa estiver pronta
  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <HomeScreen />
      {/* O LoadingScreen fica por cima de tudo até a animação terminar */}
      {!isAppReady && <LoadingScreen onFinish={() => setIsAppReady(true)} />}
    </ThemeProvider>
  );
}