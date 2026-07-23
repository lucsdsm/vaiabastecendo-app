import { useEffect, useState, useCallback } from 'react';
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
          console.error('O backend não retornou um token de autenticação.');
          showToast('O backend não retornou um token de autenticação.', 'danger');
          return;
        }

        await signIn(apiToken);
        await refreshUser();
      } catch (error) {
        console.error('Erro na autenticação com o backend:', error);
        showToast('Não foi possível validar seu login.', 'danger');
      } finally {
        setIsLoading(false);
      }
    },
    [signIn, refreshUser, showToast]
  );

  useEffect(() => {
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

  useEffect(() => {
    if (!token || user) {
      return;
    }

    loadProfile();
  }, [token, user, loadProfile]);

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  const handleLogout = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const handleMockLogin = useCallback(() => {
    if (!__DEV__) {
      return;
    }

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
    isLoading,
    token,
    request,
    promptAsync,
    handleLogout,
    handleMockLogin,
  };
}