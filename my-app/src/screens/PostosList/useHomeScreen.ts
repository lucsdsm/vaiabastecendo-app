import { useAppTheme } from '../../theme/ThemeProvider';
import { usePostos } from '../../hooks/usePostos';

/**
 * Reune estado de tema e dados da lista principal de postos.
 */
export function useHomeScreen() {
    const { colors, isDark } = useAppTheme();
    const { postos, loading, refreshing, error, refetch } = usePostos();

    const shouldShowErrorCard = !loading && !!error && postos.length === 0;

    return {
        colors,
        isDark,
        postos,
        loading,
        refreshing,
        error,
        refetch,
        shouldShowErrorCard,
    };
}
