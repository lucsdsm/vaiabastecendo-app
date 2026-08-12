import { useMemo } from "react";
import { DimensionValue, StyleProp, ViewStyle } from 'react-native';

import { useAppTheme } from "@theme/ThemeProvider";

import { styles } from "./styles";

interface UseButtonParams {
  disabled?: boolean;
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  width?: DimensionValue;
}

/**
 * Hook para gerenciar o estado e estilos do botão.
 */
export function useButton({
  disabled = false,
  loading = false,
  variant = "primary",
  width = '100%',
}: UseButtonParams) {
  const { colors, isDark } = useAppTheme();

  const isDisabled = disabled || loading;

  const containerStyle = useMemo(() => {
    const baseStyle: StyleProp<ViewStyle>[] = [
      styles.button,
      { width },
    ];

    if (width) {
      baseStyle.push({ width });
    }

    if (variant === "primary") {
      baseStyle.push({
        backgroundColor: isDisabled
          ? isDark
            ? "rgba(255,255,255,0.10)"
            : "rgba(0,0,0,0.08)"
          : colors.primary,
        borderColor: isDisabled ? "transparent" : colors.primary,
      });
    }

    if (variant === "secondary") {
      baseStyle.push({
        backgroundColor: isDark ? colors.primary + "1A" : colors.primary + "0D",
        borderColor: isDark ? colors.primary + "35" : colors.primary + "40",
      });
    }

    if (variant === "ghost") {
      baseStyle.push({
        backgroundColor: "transparent",
        borderColor: isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)",
      });
    }

    return baseStyle;
  }, [colors, isDark, variant, isDisabled, width]);

  const textStyle = useMemo(() => {
    if (variant === "primary") {
      return [
        styles.text,
        {
          color: isDisabled
            ? isDark
              ? colors.textPrimary
              : colors.textPrimary
            : colors.background,
        },
      ];
    }

    if (variant === "secondary") {
      return [
        styles.text,
        {
          color: isDisabled
            ? isDark
              ? colors.textSecondary
              : colors.textSecondary
            : colors.primary,
        },
      ];
    }

    return [
      styles.text,
      {
        color: isDisabled ? colors.textSecondary : colors.textPrimary,
      },
    ];
  }, [colors, isDark, variant, isDisabled]);

  const iconColor = useMemo(() => {
    if (variant === "primary") {
      return isDisabled
        ? isDark
          ? colors.textSecondary
          : colors.textPrimary
        : colors.background;
    }

    if (variant === "secondary") {
      return isDisabled ? colors.textSecondary : colors.primary;
    }

    return isDisabled ? colors.textSecondary : colors.textPrimary;
  }, [colors, variant, isDisabled]);

  const activityColor = variant === "primary" ? "#FFFFFF" : colors.primary;

  return {
    colors,
    isDark,
    isDisabled,
    containerStyle,
    textStyle,
    iconColor,
    activityColor,
    width,
  };
}
