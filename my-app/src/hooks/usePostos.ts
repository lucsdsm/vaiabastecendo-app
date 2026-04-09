import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import { PostoProps } from '../components/PostoCard';

/**
 * Normaliza a URL base da API para evitar requests malformados.
 * Garante protocolo http/https e remove barras finais duplicadas.
 */
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
 * Carrega postos da API e, quando permitido, envia a localizacao atual
 * para priorizar resultados por proximidade.
 */
export function usePostos() {
    const [postos, setPostos] = useState<PostoProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                let lat = "";
                let lng = "";
                
                if (status === 'granted') {
                    let location = await Location.getCurrentPositionAsync({});
                    lat = location.coords.latitude.toString();
                    lng = location.coords.longitude.toString();
                }

                const baseURL = normalizeApiBaseUrl(process.env.EXPO_PUBLIC_API_URL);
                const params = new URLSearchParams();

                if (lat && lng) {
                    params.set('lat', lat);
                    params.set('lng', lng);
                }

                const query = params.toString();
                const urlAPI = query
                    ? `${baseURL}/postos/?${query}`
                    : `${baseURL}/postos/`;

                const response = await axios.get(urlAPI);
                
                const mappedPostos = response.data.map((p: any) => {
                    let textoDistancia = "Calculando...";
                    // Mantem fallback para casos em que a API ainda nao calculou distancia.
                    if (p.distancia_metros !== null) {
                        textoDistancia = p.distancia_metros < 1000 
                            ? `${Math.round(p.distancia_metros)}m` 
                            : `${(p.distancia_metros / 1000).toFixed(1)}km`;
                    }

                    return {
                        id: String(p.id),
                        nome: p.nome,
                        endereco: p.endereco,
                        latitude: p.latitude,
                        longitude: p.longitude,
                        distancia: textoDistancia,
                        precoGasolina: 0,
                        precoEtanol: 0,
                        ultimaAtualizacao: "Pendente",
                        likes: 0
                    };
                });

                setPostos(mappedPostos);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Erro ao carregar postos da API:', {
                        message: error.message,
                        code: error.code,
                        url: error.config?.url,
                        status: error.response?.status,
                        data: error.response?.data
                    });
                } else {
                    console.error('Erro ao carregar postos da API:', error);
                }
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return { postos, loading };
}