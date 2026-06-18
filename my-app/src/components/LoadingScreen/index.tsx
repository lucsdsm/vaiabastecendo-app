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
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Carregando postos proximos...</Text>

        <View style={styles.gaugeContainer}>
          {/* Arco de Fundo do Medidor */}
          <View style={[styles.gaugeBackground, { borderColor: colors.border }]} />
          
          {/* Marcadores E (Vazio) e F (Cheio) */}
          <View style={styles.gaugeLabels}>
            <Text style={[styles.labelText, { color: '#E74C3C' }]}>E</Text>
            <Text style={[styles.labelText, { color: '#2ECC71' }]}>F</Text>
          </View>

          {/* Eixo e Ponteiro Animado */}
          <Animated.View style={[
            styles.needleWrapper,
            { transform: [{ rotate: rotateInterpolated }] }
          ]}>
            <View style={[styles.needle, { backgroundColor: colors.primary }]} />
          </Animated.View>

          {/* Ponto central do ponteiro */}
          <View style={[styles.needleCenter, { backgroundColor: colors.primary }]} />
        </View>
      </View>
    </Animated.View>
  );
}