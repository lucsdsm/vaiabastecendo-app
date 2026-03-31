// Tokens semanticos do tema claro usados em toda a UI.
export const lightTheme = {
  background: '#F5F5F5',
  surface: '#FFFFFF',
  primary: '#0056D2', 
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  border: '#E0E0E0',
  success: '#2E7D32',
  danger: '#D32F2F',
};

// Tokens semanticos do tema escuro com contraste equivalente ao tema claro.
export const darkTheme = {
  background: '#121212',
  surface: '#1E1E1E',
  primary: '#60A5FA',
  textPrimary: '#F5F5F5',
  textSecondary: '#A0A0A0',
  border: '#333333',
  success: '#81C784',
  danger: '#EF5350',
};

export type ThemeColors = typeof lightTheme;