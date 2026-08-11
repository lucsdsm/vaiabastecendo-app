import React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';

import { useActionToast } from './useActionToast';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { styles } from './styles';

export function ActionToast() {
  const {
    toastState,
    translateY,
    progress,
    handleConfirm,
    accentColor,
    icon,
    fallbackTitle,
    backgroundColor,
    color,
  } = useActionToast();

  if (!toastState.visible) {
    return null;
  }

  const isConfirmation = Boolean(toastState.onConfirm);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.position,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={[styles.card, { backgroundColor }]}>
        <View style={styles.row}>
          <View
            style={[
              styles.icon,
              { backgroundColor: `${accentColor}1A` },
            ]}
          >
            <FontAwesome6
              name={icon as any}
              size={16}
              iconStyle="solid"
              style={[styles.icon, { color: accentColor }]}
            />
          </View>

          <View style={styles.content}>
            <Text style={[styles.title, { color }]}>
              {toastState.title ?? fallbackTitle}
            </Text>

            <Text style={[styles.message, { color, opacity: 0.72 }]}>
              {toastState.message}
            </Text>
          </View>
        </View>

        {isConfirmation ? (
          <View style={styles.actions}>
            <Pressable
              onPress={handleConfirm}
              accessibilityRole="button"
              accessibilityLabel={toastState.confirmText ?? 'Confirmar ação'}
              style={({ pressed }) => [
                styles.action,
                {
                  backgroundColor: accentColor,
                  opacity: pressed ? 0.72 : 1,
                },
              ]}
            >
              <Text style={[styles.text, { color: backgroundColor }]}>
                {toastState.confirmText ?? 'Confirmar'}
              </Text>
            </Pressable>
          </View>
        ) : null}

        <View
          style={[
            styles.track,
            { backgroundColor: `${accentColor}1A` },
          ]}
        >
          <Animated.View
            style={[
              styles.bar,
              {
                width: progressWidth,
                backgroundColor: accentColor,
              },
            ]}
          />
        </View>
      </View>
    </Animated.View>
  );
}
