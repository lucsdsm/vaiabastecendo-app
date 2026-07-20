import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';

import { useAppTheme } from '../../theme/ThemeProvider';
import { StationCardProps } from '../StationCard';
import { useStations } from '../../hooks/useStations';

interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

/**
 * Centraliza o estado e os comportamentos da tela de mapa.
 * Controla seleção de posto, localização do usuário e recentralização do mapa.
 */
export function useMapScreen() {
  const { colors, isDark } = useAppTheme();
  const { stations, refetch } = useStations();

  const [selectedStation, setSelectedStation] = useState<StationCardProps | null>(null);
  const [userRegion, setUserRegion] = useState<MapRegion | null>(null);
  const [recenterToken, setRecenterToken] = useState(0);

  /**
   * Região inicial de fallback usada antes de obter a localização real do usuário.
   */
  const initialRegion: MapRegion = {
    latitude: -5.79448,
    longitude: -35.211,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  function handleSelectStation(station: StationCardProps) {
    setSelectedStation(station);
  }

  function handleCloseCard() {
    setSelectedStation(null);
  }

  useEffect(() => {
    /**
     * Antecipar a solicitação de permissão ajuda a reduzir latência
     * quando a tela precisar centralizar no usuário.
     */
    (async () => {
      await Location.requestForegroundPermissionsAsync();
    })();
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function resolveUserRegion() {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          return;
        }

        /**
         * Prioriza a última posição conhecida por ser mais rápida.
         * Se não existir, busca a localização atual com precisão balanceada.
         */
        let location = await Location.getLastKnownPositionAsync({});

        if (!location) {
          location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
        }

        if (!location || !isActive) {
          return;
        }

        setUserRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });

        /**
         * Incrementa o token para forçar uma nova recentralização,
         * mesmo que a região resultante seja parecida com a anterior.
         */
        setRecenterToken((value) => value + 1);
      }

      resolveUserRegion();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return {
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
  };
}