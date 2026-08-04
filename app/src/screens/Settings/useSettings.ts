import { useEffect, useMemo, useState } from 'react';

import { useAppTheme } from '../../theme/ThemeProvider';

export function useSettings() {
  const { colors, toggleTheme, isDark } = useAppTheme();

  return {
    colors,
    isDark,
    toggleTheme,
  };
}