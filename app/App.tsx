import React, { useEffect, useMemo, useState } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import LoadingScreen from './src/components/LoadingScreen';
import { Toast } from './src/components/Toast';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import { FuelTypeProvider } from './src/contexts/FuelTypesContext';
import { ToastProvider } from './src/contexts/ToastContext';
import AddFuelLogScreen from './src/screens/AddFuelLog';
import AddVehicleScreen from './src/screens/AddVehicle';
import FuelLogScreen from './src/screens/FuelLog';
import MapScreen from './src/screens/MapView';
import PermissionScreen from './src/screens/PermissionScreen';
import StationListScreen from './src/screens/StationList';
import UpdatePriceScreen from './src/screens/UpdatePrice';
import UserProfileScreen from './src/screens/UserProfile';
import { ThemeProvider, useAppTheme } from './src/theme/ThemeProvider';
import { initDatabase } from './src/database';

type RootStackParamList = {
  Permission: undefined;
  StationList: undefined;
  Map: undefined;
  UserProfile: undefined;
  UpdatePrice: undefined;
  FuelLog: undefined;
  AddVehicle: undefined;
  AddFuelLog: undefined;
};

type AppNavigatorProps = {
  hasLocationPermission: boolean;
  onPermissionGranted: () => void;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Renderiza a árvore de navegação principal com base no estado
 * atual da permissão de localização.
 */
function AppNavigator({
  hasLocationPermission,
  onPermissionGranted,
}: AppNavigatorProps) {
  const { colors, isDark } = useAppTheme();

  const navigationTheme = useMemo(
    () => ({
      ...(isDark ? DarkTheme : DefaultTheme),
      colors: {
        ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
        background: colors.background,
        card: colors.surface,
        text: colors.textPrimary,
        border: colors.border,
        primary: colors.primary,
        notification: colors.primary,
      },
    }),
    [colors.background, colors.border, colors.primary, colors.surface, colors.textPrimary, isDark]
  );

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'none',
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {!hasLocationPermission ? (
          <Stack.Screen name="Permission">
            {(props) => (
              <PermissionScreen
                {...props}
                onPermissionGranted={onPermissionGranted}
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="StationList" component={StationListScreen} />
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
}

/**
 * Executa o bootstrap inicial da aplicação, incluindo:
 * - inicialização do banco local
 * - verificação da autenticação
 * - leitura da permissão de localização
 */
function AppContent() {
  const { isInitializingAuth } = useAuth();
  const { isThemeReady } = useAppTheme();
  const [isAppReady, setIsAppReady] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapApp() {
      try {
        initDatabase();

        const { status } = await Location.getForegroundPermissionsAsync();

        if (isMounted) {
          setHasLocationPermission(status === 'granted');
        }
      } catch (error) {
        console.warn('Falha ao inicializar a aplicação:', error);

        if (isMounted) {
          setHasLocationPermission(false);
        }
      }
    }

    bootstrapApp();

    return () => {
      isMounted = false;
    };
  }, []);

  const canFinishLoading = !isInitializingAuth && hasLocationPermission !== null && isThemeReady;

  return (
    <>
      {isAppReady ? (
        <AppNavigator
          hasLocationPermission={Boolean(hasLocationPermission)}
          onPermissionGranted={() => setHasLocationPermission(true)}
        />
      ) : (
        <LoadingScreen
          onFinish={() => setIsAppReady(true)}
          canFinish={canFinishLoading}
        />
      )}
    </>
  );
}

/**
 * Componente raiz responsável por compor os providers globais da aplicação.
 */
export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <FuelTypeProvider>
              <AppContent />
            </FuelTypeProvider>
          </AuthProvider>
          <Toast />
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}