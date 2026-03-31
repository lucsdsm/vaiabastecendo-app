import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, ThemeColors } from './colors';

interface ThemeContextData {
  colors: ThemeColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextData | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

  const colorScheme = useColorScheme(); 
  
  const isDark = colorScheme === 'dark';
  const colors = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ colors, isDark }}>
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