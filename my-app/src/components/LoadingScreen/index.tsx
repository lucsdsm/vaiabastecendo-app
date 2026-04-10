import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, Animated, Easing, Platform } from 'react-native';
import { useAppTheme } from '../../theme/ThemeProvider';

interface LoadingScreenProps {
  onFinish: () => void;
}

/**
 * Splash de carregamento inicial com fade-out ao finalizar a animacao.
*/
export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
    const { colors } = useAppTheme();

    const progressAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // width nao suporta useNativeDriver, por isso a barra usa animacao no thread JS.
        Animated.timing(progressAnim, {
        toValue: 100,
        duration: 2000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false, 
        }).start(() => {

        // Opacidade usa native driver para garantir transicao suave no encerramento.
        Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true, 
        }).start(() => {
            onFinish(); });
        });
    }, []);

    const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

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

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    
    zIndex: 999, 
    ...Platform.select({
      android: {
        elevation: 999, 
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 0,
      }
    }),
  },
  content: {
    alignItems: 'center',
    width: '80%', 
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: 'StoryScript_400Regular', 
    marginBottom: 40,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    overflow: 'hidden', 
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  }
});