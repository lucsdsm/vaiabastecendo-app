import { useAppTheme } from '../../theme/ThemeProvider';

/**
 * Retorna dados de tema e layout usados no header principal.
 */
export function useHeader() {
    const { colors, isDark, toggleTheme } = useAppTheme();

    return {
        colors,
        isDark,
        toggleTheme,
    };
}
