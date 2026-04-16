import { useAppTheme } from '../../theme/ThemeProvider';

/**
 * Fornece cores e estado de tema para o EmptyState.
 */
export function useEmptyState() {
    const { colors, isDark } = useAppTheme();

    return { colors, isDark };
}
