import React, { createContext, useCallback, useContext, ReactNode, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, ThemeColors } from './colors';

interface ThemeContextData {
    colors: ThemeColors;
    isDark: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

/**
 * Provedor de tema global.
 * Usa o tema do sistema por padrao, com possibilidade de override manual do usuario.
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemColorScheme = useColorScheme();

    const [manualTheme, setManualTheme] = useState<'light' | 'dark' | null>(null);

    // Mantem o override manual enquanto houver preferencia local definida.
    const isDark = manualTheme !== null 
    ? manualTheme === 'dark' 
    : systemColorScheme === 'dark';

    const colors = isDark ? darkTheme : lightTheme;

    const toggleTheme = useCallback(() => {
        setManualTheme((prev) => {
            const resolvedIsDark = prev ? prev === 'dark' : systemColorScheme === 'dark';
            return resolvedIsDark ? 'light' : 'dark';
        });
    }, [systemColorScheme]);

    const value = useMemo(() => ({ colors, isDark, toggleTheme }), [colors, isDark, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * Retorna o tema atual da aplicacao.
 * Deve ser usado dentro de ThemeProvider.
 */
export const useAppTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useAppTheme deve ser usado dentro de ThemeProvider');
    }

    return context;
};