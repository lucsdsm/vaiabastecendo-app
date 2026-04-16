import { useMemo, useState } from 'react';
import { Linking } from 'react-native';

import { useAppTheme } from '../../theme/ThemeProvider';

export interface PrecoAtual {
    tipo: string;
    cor: string;
    preco: number;
    data: string;
}

/**
 * Estrutura de dados exibida no card de posto.
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
 * Encapsula estado local e comportamentos de interacao do card de posto.
 */
export function usePostoCard(data: PostoProps) {
    const { colors, isDark } = useAppTheme();
    const [isLiked, setIsLiked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const priceRows = useMemo(() => {
        const rows: PrecoAtual[][] = [];
        const currentPrices = Array.isArray(data.precos_atuais) ? data.precos_atuais : [];

        for (let i = 0; i < currentPrices.length; i += 4) {
            rows.push(currentPrices.slice(i, i + 4));
        }

        return rows;
    }, [data.precos_atuais]);

    const handleGetDirections = () => {
        const { latitude, longitude, nome } = data;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}&destination_place_id=${nome}`;

        Linking.openURL(url).catch((err) => console.error('Erro ao abrir o mapa:', err));
    };

    return {
        colors,
        isDark,
        isLiked,
        modalVisible,
        priceRows,
        toggleLike: () => setIsLiked((prev) => !prev),
        openModal: () => setModalVisible(true),
        closeModal: () => setModalVisible(false),
        handleGetDirections,
    };
}
