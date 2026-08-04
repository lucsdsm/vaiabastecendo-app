import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Image } from 'react-native';

import { styles } from './styles';
import { useAppTheme } from '../../theme/ThemeProvider';
import { iconsDictionary } from '../../utils/iconsDictionary';

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface LoadingStateProps {
  message?: string;
  iconName?: keyof typeof iconsDictionary;
}

export default function LoadingState({
  message = 'Carregando...',
  iconName,
}: LoadingStateProps) {
  const { colors } = useAppTheme();

  const scaleAnim = useRef(new Animated.Value(0.96)).current;
  const opacityAnim = useRef(new Animated.Value(0.75)).current;
  const imageSource = iconName && iconsDictionary[iconName]
    ? iconsDictionary[iconName]
    : iconsDictionary.logo;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.04,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.96,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.75,
            duration: 900,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [scaleAnim, opacityAnim]);

  return (
    <View style={styles.container}>
      <AnimatedImage
        source={imageSource}
        resizeMode="contain"
        style={{
          width: 128,
          height: 128,
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        }}
      />

      <Text style={[styles.message, { color: colors.textSecondary }]}>
        {message}
      </Text>
    </View>
  );
}