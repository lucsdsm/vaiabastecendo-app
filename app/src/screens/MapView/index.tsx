import React from 'react';
import { View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useMapScreen } from '@components/Map/useMapScreen';

import Map from '@components/Map';

import StationCard from '@components/StationCard';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { styles } from './styles';

import { useNavigation } from '@react-navigation/native';
import { RootNavigationProp } from "@navigation/types";


/**
 * Tela de visualização em mapa com seleção de postos e card em sobreposição.
 */
export default function MapScreen() {
  const {
    colors,
    isDark,
    stations,
    initialRegion,
    userRegion,
    recenterToken,
    selectedStation,
    handleSelectStation,
    handleCloseCard,
    refetch,
  } = useMapScreen();

  const navigation = useNavigation<RootNavigationProp>();

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.fab,
            {
              backgroundColor: colors.surface,
            },
            pressed && { opacity: 0.6 },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <FontAwesome6
            name="arrow-left"
            size={20}
            iconStyle='solid'
            color={colors.primary}/>
        </Pressable>
      
        <Map
          stations={stations}
          initialRegion={initialRegion}
          targetRegion={userRegion}
          recenterToken={recenterToken}
          selectedStationId={selectedStation?.id}
          onSelectStation={handleSelectStation}
          onMapPress={handleCloseCard}
        />

        {selectedStation && (
          <View style={styles.overlay} pointerEvents="box-none">
            <View style={styles.wrapper}>
              <StationCard data={selectedStation} onRefresh={refetch} />
            </View>
          </View>
        )}
      </View>

    </SafeAreaView>
  );
}