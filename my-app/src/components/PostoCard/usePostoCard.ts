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
    likes: number;
    is_liked: boolean;
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
    bandeira: string;
    data_ultimaAtualizacao: string;
    autor_ultimaAtualizacao: string;
    precos_atuais: PrecoAtual[];
}

/**
 * Encapsula estado local e comportamentos de interacao do card de posto
 */
export function usePostoCard(data: PostoProps) {
    const { colors, isDark } = useAppTheme();

    const { token } = useAuth();
    const { showToast } = useToast();

    const [precosLocais, setPrecosLocais] = useState<PrecoAtual[]>(data.precos_atuais || []);

    const [modalVisible, setModalVisible] = useState(false);

    const { userData } = useAuth();

    useEffect(() => {
        setPrecosLocais(data.precos_atuais || []);
    }, [data.precos_atuais]);

    /*
     * Organiza os precos atuais em linhas de ate 2 itens para manter legibilidade no card
    */
    const priceRows = useMemo(() => {
        const rows: PrecoAtual[][] = [];
        for (let i = 0; i < precosLocais.length; i += 2) {
            rows.push(precosLocais.slice(i, i + 2));
        }
        return rows;
    }, [precosLocais])

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
     * Realiza o toggle visual de like/deslike e atualiza a contagem de likes 
       localmente para resposta imediata do UI. Em seguida, faz a chamada real 
       a API para registrar a reacao do usuario.
    */
    const handleToggleLike = async (atualizacaoId: number) => {
        if (!token) {
            showToast('Faça login para reagir a essa informação.', 'info');
            return;
        }

        setPrecosLocais(prevPrecos => prevPrecos.map(preco => {
            if (preco.id === atualizacaoId) {
                const wasLiked = preco.is_liked;
                return {
                    ...preco,
                    is_liked: !wasLiked,
                    likes: wasLiked ? preco.likes - 1 : preco.likes + 1
                };
            }
            return preco;
        }));

        try {
            await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/reacoes/`, {
                atualizacao: atualizacaoId,
                tipo: 'like'
            }, {
                headers: { Authorization: `Token ${token}` }
            });
        } catch (error) {
            console.error('Erro ao reagir à atualização:', error);
            showToast('Erro ao enviar sua reação. Tente novamente.', 'danger');

            // Em caso de erro, desfaz a alteração visual (Rollback)
            setPrecosLocais(data.precos_atuais || []);
        }
    };
    
    return {
        colors,
        isDark,
        modalVisible,
        priceRows,
        isLoggedIn: !!token,
        userData,
        closeModal: () => setModalVisible(false),
        handleGetDirections,
        toggleLike: handleToggleLike,
        handleOpenUpdateModal,
    };
}
