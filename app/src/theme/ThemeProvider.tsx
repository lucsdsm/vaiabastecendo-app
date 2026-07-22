import React, { createContext, useCallback, useContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { lightTheme, darkTheme, ThemeColors } from './colors';

interface ThemeContextData {
    colors: ThemeColors;
    isDark: boolean;
    isThemeReady: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);
const THEME_PREFERENCE_STORAGE_KEY = 'appThemePreference';

/**
 * Provedor de tema global.
 * Usa o tema do sistema por padrao, com possibilidade de override manual do usuario.
 */
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemColorScheme = useColorScheme();

    const [manualTheme, setManualTheme] = useState<'light' | 'dark' | null>(null);
    const [isThemeReady, setIsThemeReady] = useState(false);

    useEffect(() => {
        let isMounted = true;

        async function loadThemePreference() {
            try {
                const storedTheme = await SecureStore.getItemAsync(THEME_PREFERENCE_STORAGE_KEY);

                if (!isMounted) {
                    return;
                }

                if (storedTheme === 'light' || storedTheme === 'dark') {
                    setManualTheme(storedTheme);
                }
            } catch (error) {
                console.warn('Falha ao carregar a preferencia de tema:', error);
            } finally {
                if (isMounted) {
                    setIsThemeReady(true);
                }
            }
        }

        loadThemePreference();

        return () => {
            isMounted = false;
        };
    }, []);

    const persistThemePreference = useCallback(async (nextTheme: 'light' | 'dark' | null) => {
        try {
            if (nextTheme === null) {
                await SecureStore.deleteItemAsync(THEME_PREFERENCE_STORAGE_KEY);
                return;
            }

            await SecureStore.setItemAsync(THEME_PREFERENCE_STORAGE_KEY, nextTheme);
        } catch (error) {
            console.warn('Falha ao salvar a preferencia de tema:', error);
        }
    }, []);

    // Mantem o override manual enquanto houver preferencia local definida.
    const isDark = manualTheme !== null 
    ? manualTheme === 'dark' 
    : systemColorScheme === 'dark';

    const colors = isDark ? darkTheme : lightTheme;

    const toggleTheme = useCallback(() => {
        const resolvedIsDark = manualTheme !== null ? manualTheme === 'dark' : systemColorScheme === 'dark';
        const nextTheme = resolvedIsDark ? 'light' : 'dark';

        setManualTheme(nextTheme);
        void persistThemePreference(nextTheme);
    }, [manualTheme, persistThemePreference, systemColorScheme]);

    const value = useMemo(
        () => ({ colors, isDark, isThemeReady, toggleTheme }),
        [colors, isDark, isThemeReady, toggleTheme]
    );

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