import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import Footer from '../../components/Footer';
import StationCard from '../../components/StationCard';
import Map from '../../components/Map';
import { styles } from './styles';
import { useMapScreen } from '../../components/Map/useMapScreen';

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

  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.content}>
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

      <Footer />
    </SafeAreaView>
  );
}