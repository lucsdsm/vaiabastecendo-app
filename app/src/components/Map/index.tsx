import React, { useCallback, useEffect, useRef } from 'react';
import { View } from 'react-native';
import Mapbox from '@rnmapbox/maps';

import { useAppTheme } from '../../theme/ThemeProvider';
import { StationCardProps } from '../StationCard';
import StationMarker from '../PostoMarker';
import { styles } from './styles';

Mapbox.setAccessToken(
  process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN ??
    'pk.eyJ1IjoibHVjc2RzbSIsImEiOiJjbW4zZjE0MWgxZ2dtMm9vcWUwYThjZzVzIn0.Ry9gj1mKor4g9Wc7CuGepA'
);

interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface MapProps {
  stations: StationCardProps[];
  initialRegion: MapRegion;
  targetRegion?: MapRegion | null;
  recenterToken?: number;
  selectedStationId?: string | null;
  onSelectStation: (station: StationCardProps) => void;
  onMapPress: () => void;
}

/**
 * Renderiza o mapa principal com localização do usuário e marcadores dos postos.
 * Também controla recentralização e foco visual no posto selecionado.
 */
export default function Map({
  stations,
  initialRegion,
  targetRegion,
  recenterToken,
  selectedStationId,
  onSelectStation,
  onMapPress,
}: MapProps) {
  const { colors, isDark } = useAppTheme();
  const cameraRef = useRef<Mapbox.Camera>(null);

  const mapStyle = isDark ? Mapbox.StyleURL.Dark : Mapbox.StyleURL.Street;

  useEffect(() => {
    if (!cameraRef.current || !targetRegion || recenterToken === undefined) {
      return;
    }

    /**
     * Recentraliza o mapa quando a tela solicitar um novo foco na região do usuário.
     * O token evita depender apenas da igualdade estrutural do objeto de região.
     */
    cameraRef.current.setCamera({
      centerCoordinate: [targetRegion.longitude, targetRegion.latitude],
      zoomLevel: 13,
      animationDuration: 350,
    });
  }, [recenterToken, targetRegion]);

  const handleSelectStation = useCallback(
    (station: StationCardProps) => {
      /**
       * Ao selecionar um posto, sincroniza seleção externa e aproxima a câmera
       * para destacar melhor o ponto escolhido.
       */
      onSelectStation(station);

      cameraRef.current?.setCamera({
        centerCoordinate: [Number(station.longitude), Number(station.latitude)],
        zoomLevel: 15,
        animationDuration: 350,
      });
    },
    [onSelectStation]
  );

  return (
    <View style={styles.map}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={mapStyle}
        onPress={onMapPress}
        logoEnabled={false}
        compassEnabled={false}
        attributionEnabled={false}
        scaleBarEnabled={false}
      >
        <Mapbox.Camera
          ref={cameraRef}
          zoomLevel={13}
          centerCoordinate={[initialRegion.longitude, initialRegion.latitude]}
          animationMode="flyTo"
          animationDuration={0}
        />

        <Mapbox.UserLocation
          visible
          showsUserHeadingIndicator
        />

        {stations.map((station) => (
          <StationMarker
            key={station.id}
            posto={station}
            isSelected={selectedStationId === station.id}
            primaryColor={colors.primary}
            surfaceColor={colors.surface}
            onPress={handleSelectStation}
          />
        ))}
      </Mapbox.MapView>
    </View>
  );
}