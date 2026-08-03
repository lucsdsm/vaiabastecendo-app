import React, { useEffect, useState } from 'react';
import { View, Linking } from 'react-native';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState';

import { useAppTheme } from '../../theme/ThemeProvider';
import { styles } from './styles';
import { useToast } from '../../contexts/ToastContext';

import Button from '../../components/Button';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

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
        <EmptyState
          iconName="needgps"
          title="Precisamos da sua localização"
          message="Para mostrar os postos e preços atualizados perto de você, o Vai Abastecendo precisa acessar a localização do seu dispositivo."
        />

      <View style={styles.footer}>
        <Button
          title={canAskAgain ? 'Permitir Localização' : 'Abrir Configurações'}
          onPress={canAskAgain ? handleRequestPermission : handleOpenSettings}
          iconLeft={<FontAwesome6 name="location-crosshairs" size={16} iconStyle='solid' color="#FFF" />}
        />
      </View>
    </SafeAreaView>
  );
}