import { useMemo, useState } from 'react';
import { Linking } from 'react-native';

import { useAppTheme } from '../../theme/ThemeProvider';

import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

/**
 * Estrutura de dados para preços atuais exibidos no modal de detalhes do posto
 */
export interface PrecoAtual {
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
    precos_atuais: PrecoAtual[];
}

/**
 * Encapsula estado local e comportamentos de interacao do card de posto
 */
export function usePostoCard(data: PostoProps) {
    const { colors, isDark } = useAppTheme();

    const { token } = useAuth();
    const { showToast } = useToast();

    const [isLiked, setIsLiked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

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

    const handleOpenUpdateModal = () => {
        if (!token) {
            showToast('Faça login para atualizar os preços.', 'info');
            return;
        }
    };

    return {
        colors,
        isDark,
        isLiked,
        modalVisible,
        priceRows,
        isLoggedIn: !!token,
        toggleLike: () => setIsLiked((prev) => !prev),
        closeModal: () => setModalVisible(false),
        handleGetDirections,
        handleOpenUpdateModal,
    };
}
