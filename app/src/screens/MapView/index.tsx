import React from 'react';
import { View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import StationCard from '../../components/StationCard';
import Map from '../../components/Map';
import { styles } from './styles';
import { useMapScreen } from '../../components/Map/useMapScreen';

import { useNavigation } from '@react-navigation/native';

import FontAwesome6 from '@react-native-vector-icons/fontawesome6';


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

  const navigation = useNavigation<any>();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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
            color={colors.primary}
          />
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
          <View style={styles.cardOverlay} pointerEvents="box-none">
            <View style={styles.cardWrapper}>
              <StationCard data={selectedStation} onRefresh={refetch} />
            </View>
          </View>
        )}
      </View>

    </View>
  );
}