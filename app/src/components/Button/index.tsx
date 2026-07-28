import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useAppTheme } from '../../theme/ThemeProvider';
import { useButton } from './useButton';
import { styles } from './styles';

export interface AppButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  iconLeft?: React.ReactNode;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  iconLeft,
  fullWidth = true,
}: AppButtonProps) {
  const { colors } = useAppTheme();

  const {
    isDisabled,
    containerStyle,
    textStyle,
    activityColor,
  } = useButton({
    colors,
    disabled,
    loading,
    variant,
    fullWidth,
  });

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      disabled={isDisabled}
      style={containerStyle}
    >
      {loading ? (
        <ActivityIndicator size="small" color={activityColor} />
      ) : (
        <View style={styles.content}>
          {iconLeft ? <View style={styles.iconLeft}>{iconLeft}</View> : null}

          <Text style={textStyle} numberOfLines={1}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}