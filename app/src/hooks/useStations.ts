import { useState, useEffect, useRef, useCallback } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';

import { useAuth } from '../contexts/AuthContext';
import { StationCardProps } from '../components/StationCard';

/**
 * Normaliza a URL base da API para evitar requests malformados.
 * Garante protocolo http/https e remove barras finais duplicadas.
 */
function normalizeApiBaseUrl(rawUrl?: string) {
  const trimmed = rawUrl?.trim();

  if (!trimmed) {
    throw new Error('EXPO_PUBLIC_API_URL não configurada no arquivo .env');
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/\/+$/, '');
  }

  return `http://${trimmed}`.replace(/\/+$/, '');
}

/**
 * Formata a distância retornada pela API para exibição na UI.
 */
function formatDistance(distanceMeters: number | null) {
  if (distanceMeters === null || distanceMeters === undefined) {
    return 'Calculando...';
  }

  if (distanceMeters < 1000) {
    return `${Math.round(distanceMeters)}m`;
  }

  return `${(distanceMeters / 1000).toFixed(1)}km`;
}

/**
 * Carrega postos da API e, quando permitido, envia a localização atual
 * para priorizar resultados por proximidade.
 */
export function useStations() {
  const [stations, setStations] = useState<StationCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token, isInitializingAuth } = useAuth();
  const lastTokenRef = useRef<string | null | undefined>(undefined);

  const fetchStations = useCallback(
    async (refresh = false) => {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setError(null);

      try {
        const permission = await Location.requestForegroundPermissionsAsync();

        let latitude = '';
        let longitude = '';

        if (permission.status === 'granted') {
          let location = await Location.getLastKnownPositionAsync({});

          if (!location) {
            location = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.Balanced,
            });
          }

          if (location) {
            latitude = location.coords.latitude.toString();
            longitude = location.coords.longitude.toString();
          }
        }

        const baseUrl = normalizeApiBaseUrl(process.env.EXPO_PUBLIC_API_URL);
        const params = new URLSearchParams();

        if (latitude && longitude) {
          params.set('lat', latitude);
          params.set('lng', longitude);
        }

        const query = params.toString();
        const requestUrl = query
          ? `${baseUrl}/stations/?${query}`
          : `${baseUrl}/stations/`;

        const response = await axios.get(requestUrl, {
          headers: token ? { Authorization: `Token ${token}` } : {},
        });

        const rawStations = response.data.results ?? response.data;

        const mappedStations: StationCardProps[] = rawStations.map((station: any) => {
          const currentPrices = Array.isArray(station.current_prices) ? station.current_prices : [];
          const mappedCurrentPrices = currentPrices.map((price: any) => ({
            id: price.id,
            fuelType: price.fuel_type,
            color: price.color,
            price: price.price,
            createdAt: price.created_at,
            likes: price.likes,
            isLiked: price.is_liked,
          }));

          const lastUpdatedPrice = mappedCurrentPrices[0] ?? null;

          return {
            id: String(station.id),
            name: station.name,
            address: station.address,
            latitude: station.latitude,
            longitude: station.longitude,
            distance: formatDistance(station.distance_meters),
            brand: station.brand,
            rating: station.rating,
            currentPrices: mappedCurrentPrices,
            lastUpdatedAt: lastUpdatedPrice?.createdAt ?? 'Pendente',
            lastUpdatedBy: station.last_updated_by ?? { name: '', verified: false },
          };
        });

        setStations(mappedStations);
      } catch (error) {
        console.error('Erro ao buscar postos:', error);
        setError('Verifique sua conexão ou confirme com o suporte a disponibilidade da aplicação.');
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (isInitializingAuth) {
      return;
    }

    if (lastTokenRef.current === token) {
      return;
    }

    lastTokenRef.current = token;
    fetchStations();
  }, [token, isInitializingAuth, fetchStations]);

  const refetch = useCallback(() => fetchStations(true), [fetchStations]);

  return {
    stations,
    isLoading,
    isRefreshing,
    error,
    refetch,
  };
}