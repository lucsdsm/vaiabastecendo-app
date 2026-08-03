import { useCallback, useEffect, useMemo, useState } from 'react';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  authorId?: number;
  authorUsername?: string;
}

/**
 * Estrutura do autor da última atualização exibido no rodapé do card.
 */
export interface LastUpdatedBy {
  name: string;
  likes_received: number | null;
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
 * Estrutura persistida localmente para reações visuais que não devem
 * ser contabilizadas no backend, como curtidas na própria atualização.
 */
interface OwnReactionMap {
  [priceUpdateId: number]: boolean;
}

/**
 * Gera a chave única usada para persistir as curtidas locais do usuário.
 */
function getOwnReactionStorageKey(userId?: number | null) {
  return `station-card:own-reactions:${userId ?? 'anonymous'}`;
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
  const [ownReactions, setOwnReactions] = useState<OwnReactionMap>({});
  const [hasLoadedOwnReactions, setHasLoadedOwnReactions] = useState(false);

  const storageKey = useMemo(() => getOwnReactionStorageKey(user?.id), [user?.id]);

  /**
   * Carrega do armazenamento local as curtidas visuais persistidas
   * para atualizações do próprio usuário.
   */
  useEffect(() => {
    let isMounted = true;

    async function loadOwnReactions() {
      if (!user?.id) {
        if (isMounted) {
          setOwnReactions({});
          setHasLoadedOwnReactions(true);
        }
        return;
      }

      try {
        setHasLoadedOwnReactions(false);
        const storedValue = await AsyncStorage.getItem(storageKey);
        const parsedValue = storedValue ? JSON.parse(storedValue) : {};

        if (isMounted) {
          setOwnReactions(parsedValue || {});
        }
      } catch (error) {
        console.error('Erro ao carregar reações locais do usuário:', error);

        if (isMounted) {
          setOwnReactions({});
        }
      } finally {
        if (isMounted) {
          setHasLoadedOwnReactions(true);
        }
      }
    }

    loadOwnReactions();

    return () => {
      isMounted = false;
    };
  }, [storageKey, user?.id]);

  /**
   * Identifica se a atualização pertence ao usuário autenticado.
   * Prioriza campos estruturados do item e usa o autor do card como fallback.
   */
  const isOwnPriceUpdate = useCallback(
    (priceItem: CurrentPrice) => {
      if (!user) {
        return false;
      }

      if (priceItem.authorId && user.id === priceItem.authorId) {
        return true;
      }

      if (priceItem.authorUsername && user.username === priceItem.authorUsername) {
        return true;
      }

      return user.username === data.lastUpdatedBy.name;
    },
    [data.lastUpdatedBy.name, user]
  );

  /**
   * Faz merge entre os preços vindos do backend e as reações locais
   * persistidas, preservando a curtida visual nas atualizações próprias.
   */
  useEffect(() => {
    if (!hasLoadedOwnReactions) {
      return;
    }

    const nextLocalPrices = (data.currentPrices || []).map((priceItem) => {
      if (!isOwnPriceUpdate(priceItem)) {
        return priceItem;
      }

      const persistedOwnReaction = ownReactions[priceItem.id];

      if (persistedOwnReaction === undefined) {
        return priceItem;
      }

      const shouldAppearLiked = persistedOwnReaction;
      const backendIsLiked = priceItem.isLiked;
      const likesAdjustment = shouldAppearLiked && !backendIsLiked
        ? 1
        : !shouldAppearLiked && backendIsLiked
        ? -1
        : 0;

      return {
        ...priceItem,
        isLiked: shouldAppearLiked,
        likes: Math.max(0, priceItem.likes + likesAdjustment),
      };
    });

    setLocalPrices(nextLocalPrices);
  }, [data.currentPrices, hasLoadedOwnReactions, isOwnPriceUpdate, ownReactions]);

  /**
   * Persiste no armazenamento local o estado visual de curtida
   * para uma atualização do próprio usuário.
   */
  const persistOwnReaction = useCallback(
    async (priceUpdateId: number, isLiked: boolean) => {
      try {
        const nextReactions: OwnReactionMap = {
          ...ownReactions,
          [priceUpdateId]: isLiked,
        };

        setOwnReactions(nextReactions);
        await AsyncStorage.setItem(storageKey, JSON.stringify(nextReactions));
      } catch (error) {
        console.error('Erro ao salvar reação local:', error);
        throw error;
      }
    },
    [ownReactions, storageKey]
  );

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
   * resposta imediata da UI. Para atualizações próprias, persiste o estado
   * localmente sem depender do backend.
   */
  async function handleToggleLike(priceUpdateId: number) {
    if (!token) {
      showToast('Faça login para reagir a essa informação.', 'info');
      return;
    }

    const currentItem = localPrices.find((item) => item.id === priceUpdateId);

    if (!currentItem) {
      return;
    }

    const ownUpdate = isOwnPriceUpdate(currentItem);

    if (ownUpdate) {
      const nextLikedState = !currentItem.isLiked;

      setLocalPrices((prevPrices) =>
        prevPrices.map((item) =>
          item.id === priceUpdateId
            ? {
                ...item,
                isLiked: nextLikedState,
                likes: nextLikedState
                  ? item.likes + 1
                  : Math.max(0, item.likes - 1),
              }
            : item
        )
      );

      try {
        await persistOwnReaction(priceUpdateId, nextLikedState);
      } catch (error) {
        showToast('Não foi possível salvar sua reação local.', 'danger');

        setLocalPrices((prevPrices) =>
          prevPrices.map((item) =>
            item.id === priceUpdateId
              ? {
                  ...item,
                  isLiked: currentItem.isLiked,
                  likes: currentItem.likes,
                }
              : item
          )
        );
      }

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