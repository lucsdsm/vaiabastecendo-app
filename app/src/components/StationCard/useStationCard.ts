import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { useAppTheme } from '../../theme/ThemeProvider';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

/**
 * Estrutura de dados para preços atuais exibidos no card e no modal do posto.
 */
export interface CurrentPrice {
  id: number;
  fuelType: string;
  color: string;
  price: number;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

/**
 * Estrutura do autor da última atualização exibido no rodapé do card.
 */
export interface LastUpdatedBy {
  name: string;
  verified: boolean;
}

/**
 * Estrutura de dados exibida no card de posto.
 */
export interface StationCardProps {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  distance: string;
  address: string;
  brand: string;
  rating?: number;
  lastUpdatedAt: string;
  lastUpdatedBy: LastUpdatedBy;
  currentPrices: CurrentPrice[];
}

/**
 * Encapsula estado local e comportamentos de interação do card de posto.
 */
export function useStationCard(data: StationCardProps, onRefresh: () => void) {
  const { colors, isDark } = useAppTheme();
  const navigation = useNavigation<any>();

  const { token, user } = useAuth();
  const { showToast } = useToast();

  const [localPrices, setLocalPrices] = useState<CurrentPrice[]>(data.currentPrices || []);

  useEffect(() => {
    setLocalPrices(data.currentPrices || []);
  }, [data.currentPrices]);

  /**
   * Abre o aplicativo de mapas com direções para o posto.
   */
  function handleGetDirections() {
    const { latitude, longitude } = data;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

    Linking.openURL(url).catch((error) => {
      console.error('Erro ao abrir o mapa:', error);
      showToast('Não foi possível abrir o mapa.', 'danger');
    });
  }

  /**
   * Verifica se o usuário está logado antes de permitir acesso ao modal
   * de atualização de preço.
   */
  function handleOpenUpdateModal() {
    if (!token) {
      showToast('Faça login para atualizar os preços.', 'info');
      return;
    }

    navigation.navigate('UpdatePrice', {
      stationId: data.id,
      stationName: data.name,
      currentPrices: data.currentPrices,
    });
  }

  /**
   * Realiza o toggle visual de like e atualiza a contagem localmente para
   * resposta imediata da UI. Em seguida, faz a chamada real para a API.
   */
  async function handleToggleLike(priceUpdateId: number) {
    if (!token) {
      showToast('Faça login para reagir a essa informação.', 'info');
      return;
    }

    const previousPrices = localPrices;

    setLocalPrices((prevPrices) =>
      prevPrices.map((priceItem) => {
        if (priceItem.id !== priceUpdateId) {
          return priceItem;
        }

        const wasLiked = priceItem.isLiked;

        return {
          ...priceItem,
          isLiked: !wasLiked,
          likes: wasLiked ? Math.max(0, priceItem.likes - 1) : priceItem.likes + 1,
        };
      })
    );

    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/reactions/`,
        {
          price_update: priceUpdateId,
          reaction_type: 'like',
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );

      onRefresh();
    } catch (error) {
      console.error('Erro ao reagir à atualização:', error);
      showToast('Erro ao enviar sua reação. Tente novamente.', 'danger');
      setLocalPrices(previousPrices);
    }
  }

  return {
    colors,
    isDark,
    localPrices,
    isLoggedIn: !!token,
    user,
    rating: data.rating,
    handleGetDirections,
    toggleLike: handleToggleLike,
    handleOpenUpdateModal,
  };
}