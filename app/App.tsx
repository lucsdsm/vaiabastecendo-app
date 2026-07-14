import React, { useState, useEffect } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location'; // NOVO IMPORT

import { ThemeProvider, useAppTheme } from './src/theme/ThemeProvider';
import LoadingScreen from './src/components/LoadingScreen';
import PostoListScreen from './src/screens/PostosList';
import MapScreen from './src/screens/MapView';
import UserProfileScreen from './src/screens/UserProfile';
import UpdatePriceScreen from './src/screens/UpdatePrice';
import PermissionScreen from './src/screens/PermissionScreen';
import FuelLogScreen from './src/screens/FuelLog';
import AddVehicleScreen from './src/screens/AddVehicle';
import AddFuelLogScreen from './src/screens/AddFuelLog';

import { ToastProvider } from './src/contexts/ToastContext';
import { Toast } from './src/components/Toast';

import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { CombustivelProvider } from './src/contexts/CombustivelContext';

import { initDatabase } from './src/database';

const Stack = createNativeStackNavigator();

// Recebe o estado de permissao para decidir qual pilha de telas renderizar
const AppNavigator = ({ hasPermission, setHasPermission }: any) => {
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
          animation: 'none',
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {!hasPermission ? (
          // Fica preso ate liberar a localizacao, mostrando a tela de permissao
          <Stack.Screen name="Permission">
            {(props) => <PermissionScreen {...props} onPermissionGranted={() => setHasPermission(true)} />}
          </Stack.Screen>
        ) : (
          // Renderiza o app principal apos liberar a localizacao
          <>
            <Stack.Screen name="PostoList" component={PostoListScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="UserProfile" component={UserProfileScreen} />
            <Stack.Screen name="UpdatePrice" component={UpdatePriceScreen} />
            <Stack.Screen name="FuelLog" component={FuelLogScreen} />
            <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
            <Stack.Screen name="AddFuelLog" component={AddFuelLogScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppContent = () => {
  const { loading: authLoading } = useAuth();
  const [isAppReady, setIsAppReady] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // Inicializa o banco de dados e checa a permissão de localizacao
  useEffect(() => {
    async function prepareApp() {
      try {
        initDatabase();

        const { status } = await Location.getForegroundPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (e) {
        console.warn("Erro ao preparar o app:", e);
      }
    }
    
    prepareApp();
  }, []);

  // Loading so pode sumir se a auth carregou
  const canFinishLoading = !authLoading && hasPermission !== null;

  return (
    <>
      {/* So renderiza o navigator depois do loading terminar, evitando tela piscando */}
      {isAppReady && (
        <AppNavigator hasPermission={hasPermission} setHasPermission={setHasPermission} />
      )}
      
      {!isAppReady && (
        <LoadingScreen
          onFinish={() => setIsAppReady(true)}
          canFinish={canFinishLoading}
        />
      )}
    </>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <CombustivelProvider>
              <AppContent />
            </CombustivelProvider>
          </AuthProvider>
          <Toast />
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}