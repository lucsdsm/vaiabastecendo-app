import React, { cloneElement } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View, DimensionValue } from 'react-native';

import { useButton } from './useButton';

import { styles } from './styles';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  iconLeft?: React.ReactElement;
  width?: DimensionValue;
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
  width = '100%',
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
    width,
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
        <View style={[styles.content]}>
          {iconLeft ? (
            <View style={styles.icon}>
              {cloneElement(iconLeft as React.ReactElement<{ color?: string }>, {
                color: iconColor,
              })}
            </View>
          ) : null}
          <Text style={textStyle}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}