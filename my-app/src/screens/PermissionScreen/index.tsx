import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';

import { useToast } from '../../contexts/ToastContext';

interface PermissionScreenProps {
  onPermissionGranted: () => void;
}

export default function PermissionScreen({ onPermissionGranted }: PermissionScreenProps) {
  const { colors } = useAppTheme();
  const { showToast } = useToast();

  const handleRequestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status === 'granted') {
      // Dispara a mudança de estado no app.tsx, carregando o app principal
      onPermissionGranted();
    } else {
      showToast('Permissão de localização negada. Por favor, habilite nas configurações.', 'danger');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        
        <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
          <Feather name="map-pin" size={48} color={colors.primary} />
        </View>

        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Precisamos da sua localização
        </Text>
        
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          Para mostrar os postos e preços atualizados perto de você, o Vai Abastecendo precisa acessar a localização do seu dispositivo.
        </Text>

      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: colors.primary }]} 
          onPress={handleRequestPermission}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Permitir Localização</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}