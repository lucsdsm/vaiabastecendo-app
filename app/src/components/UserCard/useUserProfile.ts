import { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';

import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

/**
 * Necessário para concluir corretamente o fluxo de autenticação
 * em navegadores e no app nativo.
 */
WebBrowser.maybeCompleteAuthSession();

/**
 * Centraliza autenticação com Google, carregamento do perfil
 * e ações relacionadas à conta do usuário.
 */
export function useUserProfile() {
  const [isLoading, setIsLoading] = useState(false);

  const { token, user, signIn, signOut, updateUser, refreshUser } = useAuth();
  const { showToast } = useToast();

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'com.lucsdsm.vaiabastecendo',
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    redirectUri,
  });

  /**
   * Envia o token do Google ao backend, que valida a conta
   * e devolve o token usado pela API da aplicação.
   */
  const exchangeGoogleToken = useCallback(
    async (googleAccessToken: string) => {
      setIsLoading(true);

      try {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/auth/google/`,
          {
            access_token: googleAccessToken,
          }
        );

        const apiToken = response.data?.key;

        if (!apiToken) {
          showToast('O backend não retornou um token de autenticação.', 'danger');
          return;
        }

        await signIn(apiToken);
      } catch (error) {
        console.error('Erro na autenticação com o backend:', error);
        showToast('Não foi possível validar seu login.', 'danger');
      } finally {
        setIsLoading(false);
      }
    },
    [signIn, showToast]
  );

  useEffect(() => {
    /**
     * Observa o retorno do fluxo OAuth e inicia a troca do token do Google
     * pelo token autenticado do backend.
     */
    if (response?.type === 'success') {
      const { authentication } = response;

      if (authentication?.accessToken) {
        exchangeGoogleToken(authentication.accessToken);
      }

      return;
    }

    if (response?.type === 'error') {
      console.error('Erro no login com Google:', response);
      showToast('Não foi possível concluir o login com Google.', 'danger');
      return;
    }

    if (response?.type === 'dismiss') {
      showToast('Login cancelado.', 'info');
    }
  }, [response, showToast, exchangeGoogleToken]);

  /**
   * Atualiza os dados do perfil ao focar a tela,
   * garantindo estatísticas recentes para o usuário autenticado.
   */
  const loadProfile = useCallback(async () => {
    if (!token) {
      updateUser(null);
      return;
    }

    try {
      await refreshUser();
    } catch (error) {
      console.error('Erro ao atualizar os dados do perfil:', error);
    }
  }, [token, refreshUser, updateUser]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  /**
   * Encerra a sessão atual do usuário autenticado.
   */
  const handleLogout = useCallback(async () => {
    await signOut();
  }, [signOut]);

  /**
   * Permite testes rápidos em desenvolvimento sem depender
   * do fluxo completo de autenticação do Google.
   *
   * O mock precisa passar pelo mesmo fluxo do login real, enviando
   * um access token do Google para o backend trocar por um token da API.
   */
  const handleMockLogin = useCallback(() => {
    if (!__DEV__) {
      return;
    }

    const mockGoogleAccessToken = 'ya29.a0ARGnu0YY672_us0-KqZHM9-uxc2W0mR0t3z1W85gx_2Pm-wQFhEWRUmlxmxbID6Q9jEGGH8M-IHHhfu-j0Ykqk2ohdhTnYy27mfbYohzC0M95_LaaxaQI0TYzF7ndcoZ0nOkM_Qmc5YwEaup_PnSIBVHPZIuey8VO0va8VoGVffWyz-z43dYwCf_9BZs2JDkO2fpePMaCgYKAZUSARQSFQHGX2MiKFEkBiJ-sqNYB-JnsqanyA0206';

    if (!mockGoogleAccessToken) {
      showToast('Defina um token de teste antes de usar o login simulado.', 'info');
      return;
    }

    exchangeGoogleToken(mockGoogleAccessToken).catch((error) => {
      console.error('Erro no login simulado:', error);
    });
  }, [exchangeGoogleToken, showToast]);

  return {
    userData: user,
    isLoading,
    token,
    request,
    promptAsync,
    handleLogout,
    handleMockLogin,
  };
}