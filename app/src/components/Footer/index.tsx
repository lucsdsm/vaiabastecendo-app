import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

import { styles } from './styles';
import { useFooter } from './useFooter';


/**
 * Footer principal da aplicacao.
 * Mantem a acao primaria em destaque no centro para facilitar uso com uma mao.
*/
export default function Footer() {
  const {
    colors,
    activeRoute,
    handleOpenMap,
    handleOpenFuelLog,
    handleOpenStationList,
    handleOpenProfile,
    handleOpenSettings,
  } = useFooter();

  const isPostoList = activeRoute === 'StationList';
  const isMapActive = activeRoute === 'Map';
  const isFuelLogActive = activeRoute === 'FuelLog';
  const isProfileActive = activeRoute === 'UserProfile';
  const isSettingsActive = activeRoute === 'Settings';

  const activeColor = colors.primary;
  const inactiveColor = colors.textSecondary;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
        },
      ]}
    >
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          accessibilityRole="button"
          accessibilityLabel="Abrir mapa"
          accessibilityState={{ selected: isMapActive }}
          onPress={handleOpenMap}
        >
          <FontAwesome6
            name="map"
            size={20}
            iconStyle="solid"
            color={isMapActive ? activeColor : inactiveColor}
          />
          <Text style={[styles.label, { color: isMapActive ? activeColor : inactiveColor }]}>
            Mapa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          accessibilityRole="button"
          accessibilityLabel="Abrir diário de bordo"
          accessibilityState={{ selected: isFuelLogActive }}
          onPress={handleOpenFuelLog}
        >
          <FontAwesome6
            name="car-side"
            size={20}
            iconStyle="solid"
            color={isFuelLogActive ? activeColor : inactiveColor}
          />
          <Text style={[styles.label, { color: isFuelLogActive ? activeColor : inactiveColor }]}>
            Diário
          </Text>
        </TouchableOpacity>

        <View style={styles.centerButtonWrapper}>
          <TouchableOpacity
            style={[styles.centerButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Ir para lista de postos"
            accessibilityState={{ selected: isPostoList }}
            onPress={handleOpenStationList}
          >
            <FontAwesome6
              name="gas-pump"
              size={26}
              iconStyle="solid"
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text
            style={[
              styles.centerLabel,
              { color: isPostoList ? activeColor : colors.textSecondary },
            ]}
          >
            Postos
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={handleOpenProfile}
          accessibilityRole="button"
          accessibilityLabel="Ir para perfil"
          accessibilityState={{ selected: isProfileActive }}
        >
          <FontAwesome6
            name="circle-user"
            size={20}
            iconStyle="solid"
            color={isProfileActive ? activeColor : inactiveColor}
          />
          <Text style={[styles.label, { color: isProfileActive ? activeColor : inactiveColor }]}>
            Perfil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.6}
          onPress={handleOpenSettings}
          accessibilityRole="button"
          accessibilityLabel="Ir para configurações"
          accessibilityState={{ selected: isSettingsActive }}
        >
          <FontAwesome6
            name="gear"
            size={20}
            iconStyle="solid"
            color={isSettingsActive ? activeColor : inactiveColor}
          />
          <Text style={[styles.label, { color: isSettingsActive ? activeColor : inactiveColor }]}>
            Ajustes
          </Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}