import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { useAuth } from '@contexts/AuthContext';

export interface UserUpdateHistoryItem {
  id: number;
  station_name: string;
  station_brand?: string | null;
  station_address?: string | null;
  fuel_type: string;
  price: number;
  likes: number;
  created_at: string;
  verified?: boolean;
}

interface UseUserUpdateHistoryParams {
  enabled?: boolean;
}

type ProfileHistoryItem = {
  id: number;
  station?: {
    id?: number;
    name?: string;
    brand?: string | null;
    address?: string | null;
  };
  fuel_type?: string;
  color?: string;
  price?: string | number;
  likes?: number;
  created_at?: string;
  author?: string;
};

type ProfileResponse = {
  verified?: boolean;
  history?: ProfileHistoryItem[];
};

/**
 * Hook para buscar o histórico de atualizações do usuário.
 */

export function useUserUpdateHistory({ enabled = true }: UseUserUpdateHistoryParams) {
  const { token } = useAuth();

  const [updates, setUpdates] = useState<UserUpdateHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchUserUpdates() {
      if (!enabled || !token) {
        if (isMounted) {
          setUpdates([]);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get<ProfileResponse>(
          `${process.env.EXPO_PUBLIC_API_URL}/profile/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const history = Array.isArray(response.data?.history) ? response.data.history : [];
        const verified = Boolean(response.data?.verified ?? false);

        const normalizedData: UserUpdateHistoryItem[] = history.map((item) => ({
          id: item.id,
          station_name: item.station?.name ?? 'Posto',
          station_brand: item.station?.brand ?? null,
          station_address: item.station?.address ?? null,
          fuel_type: item.fuel_type ?? 'Combustível',
          color: item.color ?? '#6B7280',
          price: Number(item.price ?? 0),
          likes: Number(item.likes ?? 0),
          created_at: item.created_at ?? new Date().toISOString(),
          verified,
        }));

        if (isMounted) {
          setUpdates(
            normalizedData.sort(
              (a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            )
          );
        }
      } catch (error) {
        console.error('Erro ao buscar histórico de atualizações do usuário:', error);

        if (isMounted) {
          setUpdates([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUserUpdates();

    return () => {
      isMounted = false;
    };
  }, [token, enabled]);

  const summary = useMemo(() => {
    const totalUpdates = updates.length;
    const totalLikes = updates.reduce((acc, item) => acc + (item.likes || 0), 0);
    const lastPrice = updates.length ? updates[0].price : null;

    return {
      totalUpdates,
      totalLikes,
      lastPrice,
    };
  }, [updates]);

  const formatPrice = useCallback((value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }, []);

  const formatDate = useCallback((value: string) => {
    const date = new Date(value);

    return `${String(date.getDate()).padStart(2, '0')}/${String(
      date.getMonth() + 1
    ).padStart(2, '0')} às ${String(date.getHours()).padStart(2, '0')}:${String(
      date.getMinutes()
    ).padStart(2, '0')}`;
  }, []);

  const getFuelAccent = useCallback((fuelType: string) => {
    const normalized = fuelType.toLowerCase();

    if (normalized.includes('gasolina')) return '#2E86DE';
    if (normalized.includes('etanol') || normalized.includes('álcool')) return '#27AE60';
    if (normalized.includes('diesel')) return '#F39C12';
    if (normalized.includes('gnv')) return '#8E44AD';

    return '#6B7280';
  }, []);

  return {
    updates,
    loading,
    summary,
    formatPrice,
    formatDate,
    getFuelAccent,
  };
}