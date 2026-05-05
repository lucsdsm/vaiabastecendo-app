import React, { useState } from 'react';
// import { useFonts, GoogleSans_400Regular, GoogleSans_500Medium, GoogleSans_700Bold } from '@expo-google-fonts/google-sans';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useAppTheme } from './src/theme/ThemeProvider';
import LoadingScreen from './src/components/LoadingScreen';
import HomeScreen from './src/screens/Home';
import UserProfileScreen from './src/screens/UserProfile';

import { ToastProvider } from './src/contexts/ToastContext';
import { Toast } from './src/components/Toast';

import { AuthProvider } from './src/contexts/AuthContext';
import { CombustivelProvider } from './src/contexts/CombustivelContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { colors } = useAppTheme();
  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
    <SafeAreaProvider>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <CombustivelProvider>
              <AppNavigator />
            </CombustivelProvider>
          </AuthProvider>
          <Toast />
        </ToastProvider>
        
        {!isAppReady && <LoadingScreen onFinish={() => setIsAppReady(true)} />}
      </ThemeProvider>
    </SafeAreaProvider>
  );
}