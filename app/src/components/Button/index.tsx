import React, { cloneElement } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { useButton } from './useButton';

import { styles } from './styles';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  iconLeft?: React.ReactElement;
  fullWidth?: boolean;
}

/**
 * Componente de botão personalizado que exibe um botão com diferentes variantes, estados de carregamento e ícones opcionais.
 */
export default function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  iconLeft,
  fullWidth = true,
}: ButtonProps) {
  const {
    isDisabled,
    containerStyle,
    textStyle,
    iconColor,
    activityColor,
  } = useButton({
    disabled,
    loading,
    variant,
    fullWidth,
  });

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      disabled={isDisabled}
      style={containerStyle}
    >
      {loading ? (
        <ActivityIndicator size="small" color={activityColor} />
      ) : (
        <View style={styles.content}>
          {iconLeft ? (
            <View style={styles.left}>
              {cloneElement(iconLeft, { color: iconColor })}
            </View>
          ) : null}
          <Text style={textStyle}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}