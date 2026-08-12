import { useAppTheme } from '@theme/ThemeProvider';
import { useStations } from '@hooks/useStations';

/**
 * Reúne estado de tema e dados da lista principal de postos.
 */
export function useStationList() {
  const { colors, isDark } = useAppTheme();
  const { stations, isLoading, isRefreshing, error, refetch } = useStations();

  const shouldShowErrorCard = !isLoading && !!error && stations.length === 0;

  return {
    colors,
    isDark,
    stations,
    isLoading,
    isRefreshing,
    error,
    refetch,
    shouldShowErrorCard,
  };
}