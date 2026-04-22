import { useEffect, useMemo, useState } from 'react';
import { Linking } from 'react-native';

import { useAppTheme } from '../../theme/ThemeProvider';

import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

import axios from 'axios';

/**
 * Estrutura de dados para preços atuais exibidos no modal de detalhes do posto
 */
export interface PrecoAtual {
    id: number;
    tipo: string;
    cor: string;
    preco: number;
    data: string;
}

/**
 * Estrutura de dados exibida no card de posto
 */
export interface PostoProps {
    id: string;
    nome: string;
    latitude: number;
    longitude: number;
    distancia: string;
    endereco: string;
    precoGasolina: number;
    precoEtanol: number;
    ultimaAtualizacao: string;
    likes: number;
    is_liked: boolean;
    precos_atuais: PrecoAtual[];
    id_da_atualizacao: number;
}

/**
 * Encapsula estado local e comportamentos de interacao do card de posto
 */
export function usePostoCard(data: PostoProps) {
    const { colors, isDark } = useAppTheme();

    const { token } = useAuth();
    const { showToast } = useToast();

    const [isLiked, setIsLiked] = useState(data.is_liked);
    const [likesCount, setLikesCount] = useState(data.likes);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setIsLiked(data.is_liked ?? false);
        setLikesCount(data.likes ?? 0);
    }, [data.is_liked, data.likes]);

    /*
     * Organiza os precos atuais em linhas de ate 4 itens para exibicao no modal de detalhes
    */
    const priceRows = useMemo(() => {
        const rows: PrecoAtual[][] = [];
        const currentPrices = Array.isArray(data.precos_atuais) ? data.precos_atuais : [];

        for (let i = 0; i < currentPrices.length; i += 4) {
            rows.push(currentPrices.slice(i, i + 4));
        }

        return rows;
    }, [data.precos_atuais]);

    /*
     * Abre o aplicativo de mapas com direcoes para o posto
    */
    const handleGetDirections = () => {
        const { latitude, longitude } = data;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

        Linking.openURL(url).catch((err) => console.error('Erro ao abrir o mapa:', err));
    };

    /*
     * Verifica se usuario esta logado antes de permitir acesso ao modal de atualizacao de preco
    */
    const handleOpenUpdateModal = () => {
        if (!token) {
            showToast('Faça login para atualizar os preços.', 'info');
            return;
        }

        setModalVisible(true);
    };

    /*
     * Verifica se usuario esta logado antes de permitir acesso as curtidas
    */
    const handleToggleLike = async () => {
        if (!token) {
            showToast('Faça login para reagir a essa informação.', 'info');
            return;
        }
    
        const ultimaAtualizacao = data.precos_atuais[0];
        if (!ultimaAtualizacao) return;

        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/reacoes/`, {
                atualizacao: ultimaAtualizacao.id,
                tipo: 'like'
            }, {
                headers: { Authorization: `Token ${token}` }
            });

            if (response.status === 201) {
                setLikesCount(prev => prev + 1);
                setIsLiked(true);
            } else if (response.status === 204) {
                setLikesCount(prev => prev - 1);
                setIsLiked(false);
            }
        } catch (error) {
            console.error('Erro ao reagir à atualização:', error);
            showToast('Erro ao enviar sua reação. Tente novamente.', 'danger');
        }
    };
    
    return {
        colors,
        isDark,
        isLiked,
        likesCount,
        modalVisible,
        priceRows,
        isLoggedIn: !!token,
        toggleLike: handleToggleLike,
        closeModal: () => setModalVisible(false),
        handleGetDirections,
        handleOpenUpdateModal,
    };
}
