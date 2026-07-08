import { useCallback } from 'react';

import axios from 'axios';

import { useAuth } from '../contexts/AuthContext';

function normalizeApiBaseUrl(rawUrl?: string) {
    const trimmed = rawUrl?.trim();

    if (!trimmed) {
        throw new Error('EXPO_PUBLIC_API_URL nao configurada no arquivo .env');
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
export function useHistoricoPosto() {
    const { token } = useAuth();

    const getHistorico = useCallback(async (id: string) => {
        const baseURL = normalizeApiBaseUrl(process.env.EXPO_PUBLIC_API_URL);

        const response = await axios.get(`${baseURL}/postos/${id}/historico/`, {
            headers: token ? { Authorization: `Token ${token}` } : {}
        });

        return response.data;
    }, [token]);

    return { getHistorico };
}