import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import axios from 'axios';
import { PostoProps } from '../components/PostoCard';
import { useAuth } from '../contexts/AuthContext';

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
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    const fetchPostos = async (isRefreshing = false) => {
        if (isRefreshing) {
            setRefreshing(true);
        }
        else {
            setLoading(true);
        }
        setError(null);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            let lat = "";
            let lng = "";

            if (status === 'granted') {
                // tenta pegar a última posição salva (instantâneo)
                let location = await Location.getLastKnownPositionAsync({});

                // 2. se não tiver, pede a atual, mas sem exigir precisão alta (para ser mais rápido)
                if (!location) {
                    location = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.Balanced
                    });
                }

                if (location) {
                    lat = location.coords.latitude.toString();
                    lng = location.coords.longitude.toString();
                }
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

            const response = await axios.get(urlAPI, {
                headers: token ? { Authorization: `Token ${token}` } : {}
            });

            const dadosParaMapear = response.data.results ? response.data.results : response.data;

            const mappedPostos = dadosParaMapear.map((p: any) => {
                let textoDistancia = "Calculando...";
                if (p.distancia_metros !== null) {
                    textoDistancia = p.distancia_metros < 1000
                        ? `${Math.round(p.distancia_metros)}m`
                        : `${(p.distancia_metros / 1000).toFixed(1)}km`;
                }

                let data_ultimaAtualizacao = "Pendente";
                let autor_ultimaAtualizacao = "";
                if (p.precos_atuais && p.precos_atuais.length > 0) {
                    const datas = p.precos_atuais.map((item: any) => new Date(item.data).getTime());
                    const maxData = new Date(Math.max(...datas));
                    data_ultimaAtualizacao = maxData.toISOString();
                    autor_ultimaAtualizacao = p.autor_ultima_atualizacao || "";
                }

                return {
                    id: String(p.id),
                    nome: p.nome,
                    endereco: p.endereco,
                    latitude: p.latitude,
                    longitude: p.longitude,
                    distancia: textoDistancia,
                    precos_atuais: p.precos_atuais,
                    data_ultimaAtualizacao: data_ultimaAtualizacao,
                    autor_ultimaAtualizacao: autor_ultimaAtualizacao,
                    likes: p.likes ?? 0, 
                    is_liked: p.is_liked ?? false
                };
            });

            setPostos(mappedPostos);
            } catch (error) {
                console.error("Erro da API:", error);
                setError("Verifique sua conexão ou confirme com o suporte a disponibilidade da aplicação.");
            } 
            finally {
                setLoading(false);
                setRefreshing(false);
            }
    };

    useEffect(() => {
        fetchPostos();
    }, [token]);

    return { postos, loading, refreshing, error, refetch: () => fetchPostos(true) };
}