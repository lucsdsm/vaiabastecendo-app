import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
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
  const [canAskAgain, setCanAskAgain] = useState(true);

  useEffect(() => {
    async function checkExistingPermission() {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === 'granted') {
        onPermissionGranted();
      }
    }

    checkExistingPermission();
  }, [onPermissionGranted]);

  const handleRequestPermission = async () => {
    const { status, canAskAgain: canAskAgainResult } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {
      onPermissionGranted();
      return;
    }

    setCanAskAgain(canAskAgainResult);

    if (!canAskAgainResult) {
      showToast('Permissão de localização bloqueada. Habilite manualmente nas configurações do dispositivo.', 'danger');
    } else {
      showToast('Permissão de localização negada. Por favor, habilite nas configurações.', 'danger');
    }
  };

  const handleOpenSettings = () => {
    Linking.openSettings();
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
          onPress={canAskAgain ? handleRequestPermission : handleOpenSettings}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {canAskAgain ? 'Permitir Localização' : 'Abrir Configurações'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}