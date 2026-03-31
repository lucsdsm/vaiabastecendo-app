import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, ThemeColors } from './colors';

interface ThemeContextData {
    colors: ThemeColors;
    isDark: boolean;
    toggleTheme?: () => void;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemColorScheme = useColorScheme();

    const [manualTheme, setManualTheme] = useState<'light' | 'dark' | null>(null);

    const isDark = manualTheme !== null 
    ? manualTheme === 'dark' 
    : systemColorScheme === 'dark';

    const colors = isDark ? darkTheme : lightTheme;

    const toggleTheme = () => {
        setManualTheme(isDark ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useAppTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useAppTheme deve ser usado dentro de ThemeProvider');
    }

    return context;
};