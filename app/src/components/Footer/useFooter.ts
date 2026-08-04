import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useAppTheme } from '../../theme/ThemeProvider';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Centraliza estado de tema e controle do modal de perfil no rodape.
 */
export function useFooter() {
  const { colors, toggleTheme } = useAppTheme();
  const { userData } = useAuth();
  const navigation = useNavigation<any>();

  const activeRoute = useNavigationState(
    (state) => state?.routes[state.index]?.name || 'StationList'
  );

  const handleOpenMap = () => navigation.navigate('Map');
  const handleOpenFuelLog = () => navigation.navigate('FuelLog');
  const handleOpenStationList = () => navigation.navigate('StationList');
  const handleOpenProfile = () => navigation.navigate('UserProfile');
  const handleOpenSettings = () => navigation.navigate('Settings');

  return {
    userData,
    colors,
    toggleTheme,
    activeRoute,
    handleOpenMap,
    handleOpenFuelLog,
    handleOpenStationList,
    handleOpenProfile,
    handleOpenSettings,
  };
}
