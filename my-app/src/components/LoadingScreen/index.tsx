import React from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { styles } from './styles';
import { useLoadingScreen } from './useLoadingScreen';

interface LoadingScreenProps {
  onFinish: () => void;
  canFinish: boolean;
}

/**
 * Splash de carregamento inicial com fade-out ao finalizar a animacao.
*/
export default function LoadingScreen({ onFinish, canFinish }: LoadingScreenProps) {
  const { colors, opacityAnim, widthInterpolated } = useLoadingScreen(onFinish, canFinish);

  return (
    <Animated.View style={[
      styles.container, 
      { backgroundColor: colors.background, opacity: opacityAnim }
    ]}>
      <View style={styles.content}>
        <Image 
          source={require('../../../assets/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Vai Abastecendo
        </Text>

        <View style={[styles.progressBarContainer, { borderColor: colors.border }]}>
          <Animated.View style={[
            styles.progressBar, 
            { backgroundColor: colors.textPrimary, width: widthInterpolated }
          ]} />
        </View>
      </View>
    </Animated.View>
  );
}