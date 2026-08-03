import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';

import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

WebBrowser.maybeCompleteAuthSession();

export function useUserProfile() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    token,
    user,
    signIn,
    signOut,
    refreshUser,
    isInitializingAuth,
  } = useAuth();
  const { showToast } = useToast();

  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'com.lucsdsm.vaiabastecendo',
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    redirectUri,
  });

  const exchangeGoogleToken = useCallback(
    async (googleToken: string) => {
      setIsLoading(true);

      try {
        const response = await axios.post(
          `${process.env.EXPO_PUBLIC_API_URL}/auth/google/`,
          {
            access_token: googleToken,
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
    if (response?.type === 'success') {
      const googleToken =
        response.authentication?.accessToken || response.authentication?.idToken;

      if (googleToken) {
        exchangeGoogleToken(googleToken);
      } else {
        showToast('Google não retornou token de autenticação.', 'danger');
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
  }, [response, exchangeGoogleToken, showToast]);

  useFocusEffect(
    useCallback(() => {
      if (!token || isInitializingAuth) {
        return;
      }

      void refreshUser().catch((error) => {
        console.error('Erro ao sincronizar o perfil ao abrir a tela:', error);
      });
    }, [token, isInitializingAuth, refreshUser])
  );

  const handleLogout = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const handleRefreshProfile = useCallback(async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      await refreshUser();
    } catch (error) {
      console.error('Erro ao atualizar os dados do perfil:', error);
      showToast('Não foi possível atualizar o perfil.', 'danger');
    } finally {
      setIsLoading(false);
    }
  }, [token, refreshUser, showToast]);

  const handleMockLogin = useCallback(() => {
    if (!__DEV__) return;

    const mockGoogleAccessToken = '';

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
    token,
    request,
    promptAsync,
    isLoading,
    isInitializingAuth,
    handleLogout,
    handleRefreshProfile,
    handleMockLogin,
  };
}