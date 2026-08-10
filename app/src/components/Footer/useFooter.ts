import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useAppTheme } from "@theme/ThemeProvider";

/**
 * Hook que centraliza estado de tema e controle do modal de perfil no footer.
 */
export function useFooter() {
  const { colors } = useAppTheme();
  const navigation = useNavigation<any>();

  const activeRoute = useNavigationState(
    (state) => state?.routes[state.index]?.name || "StationList",
  );

  const handleOpenMap = () => navigation.navigate("Map");
  const handleOpenFuelLog = () => navigation.navigate("FuelLog");
  const handleOpenStationList = () => navigation.navigate("StationList");
  const handleOpenProfile = () => navigation.navigate("UserProfile");
  const handleOpenSettings = () => navigation.navigate("Settings");

  return {
    colors,
    activeRoute,
    handleOpenMap,
    handleOpenFuelLog,
    handleOpenStationList,
    handleOpenProfile,
    handleOpenSettings,
  };
}
