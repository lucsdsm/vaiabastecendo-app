import React from 'react';
import { Animated, Text, View } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { useToastAnimation } from './useToastAnimation';
import { styles } from './styles';

export function Toast() {
  const { toastState, translateY, backgroundColor, icon, title } = useToastAnimation();

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor, transform: [{ translateY }] },
      ]}
    >
      <View style={styles.iconContainer}>
        <FontAwesome6 name={icon as any} size={18} iconStyle='solid' color="#FFF" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{toastState.message}</Text>
      </View>
    </Animated.View>
  );
}