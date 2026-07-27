import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { useAuth } from '../../contexts/AuthContext';

export interface UserUpdatesHistoryItem {
  id: number;
  station_name: string;
  station_brand?: string | null;
  fuel_type: string;
  price: number;
  likes: number;
  created_at: string;
  verified?: boolean;
}

interface UseUserUpdatesHistoryParams {
  userId?: number | null;
}

/**
 * Centraliza a busca, transformação e resumo do histórico
 * de atualizações de preço realizadas pelo usuário.
 */
export function useUserUpdatesHistory({
  userId,
}: UseUserUpdatesHistoryParams) {
  const { token } = useAuth();

  const [updates, setUpdates] = useState<UserUpdatesHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    /**
     * Busca o histórico de atualizações do usuário autenticado
     * ou do usuário informado na tela de perfil.
     */
    async function fetchUserUpdates() {
      if (!token || !userId) {
        if (isMounted) {
          setUpdates([]);
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);

        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/updates-history/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        const normalizedData = (response.data || []).map((item: any) => ({
          id: item.id,
          station_name: item.station_name ?? item.station?.name ?? 'Posto',
          station_brand: item.station_brand ?? item.station?.brand ?? null,
          fuel_type: item.fuel_type ?? item.fuelType ?? 'Combustível',
          price: Number(item.price ?? 0),
          likes: Number(item.likes ?? item.likes_count ?? 0),
          created_at: item.created_at,
          verified: Boolean(item.verified ?? item.user_verified ?? false),
        }));

        if (isMounted) {
          setUpdates(
            normalizedData.sort(
              (a: UserUpdatesHistoryItem, b: UserUpdatesHistoryItem) =>
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
  }, [token, userId]);

  /**
   * Resume os principais números exibidos no topo do componente.
   */
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

  /**
   * Formata preços no padrão monetário utilizado pela aplicação.
   */
  const formatPrice = useCallback((value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }, []);

  /**
   * Formata data e horário de forma curta para leitura em lista.
   */
  const formatDate = useCallback((value: string) => {
    const date = new Date(value);

    return `${String(date.getDate()).padStart(2, '0')}/${String(
      date.getMonth() + 1
    ).padStart(2, '0')} às ${String(date.getHours()).padStart(2, '0')}:${String(
      date.getMinutes()
    ).padStart(2, '0')}`;
  }, []);

  /**
   * Define uma cor de destaque discreta com base no combustível.
   */
  const getFuelAccent = useCallback((fuelType: string) => {
    const normalized = fuelType.toLowerCase();

    if (normalized.includes('gasolina')) {
      return '#2E86DE';
    }

    if (normalized.includes('etanol') || normalized.includes('álcool')) {
      return '#27AE60';
    }

    if (normalized.includes('diesel')) {
      return '#F39C12';
    }

    if (normalized.includes('gnv')) {
      return '#8E44AD';
    }

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