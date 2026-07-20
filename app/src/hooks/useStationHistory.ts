import { useCallback } from 'react';
import axios from 'axios';

import { useAuth } from '../contexts/AuthContext';

/**
 * Normaliza a URL base da API para evitar requests malformados.
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
 * Fornece acesso somente ao histórico de preços de um posto.
 * Evita carregar a lista completa de postos quando a tela só precisa do histórico.
 */
export function useStationHistory() {
  const { token } = useAuth();

  const getStationHistory = useCallback(async (stationId: string) => {
    const baseUrl = normalizeApiBaseUrl(process.env.EXPO_PUBLIC_API_URL);

    const response = await axios.get(`${baseUrl}/stations/${stationId}/history/`, {
      headers: token ? { Authorization: `Token ${token}` } : {},
    });

    return response.data;
  }, [token]);

  return { getStationHistory };
}