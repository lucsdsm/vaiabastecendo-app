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

  const progressColor = isConfirmation ? backgroundColor : accentColor;

  const progressTrackColor = isConfirmation
    ? `${backgroundColor}45`
    : `${accentColor}1A`;

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
              styles.container,
              { backgroundColor: `${accentColor}1A` },
            ]}
          >
            <FontAwesome6
              name={icon as any}
              iconStyle="solid"
              color={accentColor}
              size={18}
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
              <Text style={[styles.actionText, { color: backgroundColor }]}>
                {toastState.confirmText ?? 'Confirmar'}
              </Text>

              <View
                style={[
                  styles.track,
                  { backgroundColor: progressTrackColor },
                ]}
              >
                <Animated.View
                  style={[
                    styles.bar,
                    {
                      backgroundColor: progressColor,
                      transformOrigin: 'left center',
                      transform: [{ scaleX: progress }],
                    },
                  ]}
                />
              </View>
            </Pressable>
          </View>
        ) : (
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
                  backgroundColor: accentColor,
                  transformOrigin: 'left center',
                  transform: [{ scaleX: progress }],
                },
              ]}
            />
          </View>
        )}
      </View>
    </Animated.View>
  );
}
