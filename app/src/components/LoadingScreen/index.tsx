import React from 'react';
import { View, Text, Image, Animated } from 'react-native';

import { useLoadingScreen } from './useLoadingScreen';

import { styles } from './styles';

interface LoadingScreenProps {
  onFinish: () => void;
  canFinish: boolean;
}

/**
 * Splash de carregamento inicial com fade-out ao finalizar a animação.
*/
export default function LoadingScreen({ onFinish, canFinish }: LoadingScreenProps) {
  const { colors, opacityAnim, rotateInterpolated } = useLoadingScreen(onFinish, canFinish);

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
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Ligando os motores...</Text>

        <View style={styles.gauge}>
          {/* Arco de fundo do medidor */}
          <View style={[styles.background, { borderColor: colors.border }]} />
          
          {/* Marcadores E (vazio) e F (cheio) */}
          <View style={styles.labels}>
            <Text style={[styles.label, { color: '#E74C3C' }]}>E</Text>
            <Text style={[styles.label, { color: '#2ECC71' }]}>F</Text>
          </View>

          {/* Eixo e ponteiro animado */}
          <Animated.View style={[
            styles.wrapper,
            { transform: [{ rotate: rotateInterpolated }] }
          ]}>
            <View style={[styles.needle, { backgroundColor: colors.primary }]} />
          </Animated.View>

          {/* Ponto central do ponteiro */}
          <View style={[styles.center, { backgroundColor: colors.primary }]} />
        </View>
      </View>
    </Animated.View>
  );
}