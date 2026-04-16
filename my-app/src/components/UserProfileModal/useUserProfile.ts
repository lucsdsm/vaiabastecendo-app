import { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as SecureStore from 'expo-secure-store';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';

// Necessario para concluir corretamente o fluxo de autenticacao no app nativo.
WebBrowser.maybeCompleteAuthSession();

/**
 * Gerencia autenticacao Google e carregamento do perfil do usuario.
 */
export function useUserProfile(visible: boolean) {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<{ primeiro_nome: string; ultimo_nome: string; foto: string } | null>(null);

    const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'vaiabastecendo',
    });

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
        redirectUri: redirectUri,
    });

    const buscarDadosDoUsuario = async (jwtToken: string) => {
        try {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/auth/me/`, {
                headers: {
                    Authorization: `Token ${jwtToken}`
                }
            });
            setUserData(res.data);
        } catch (error) {
            console.error("Erro ao buscar dados do usuário:", error);
        }
    };

    useEffect(() => {
        if (visible) {
            SecureStore.getItemAsync('userToken').then(savedToken => {
                if (savedToken) {
                    setToken(savedToken);
                    buscarDadosDoUsuario(savedToken);
                }
            });
        }
    }, [visible]);

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            if (authentication?.accessToken) {
                enviarTokenParaDjango(authentication.accessToken);
            }
        } else if (response?.type === 'error' || response?.type === 'dismiss') {
            console.log('Erro no login:', response);
        }
    }, [response]);

    const enviarTokenParaDjango = async (googleToken: string) => {
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/google/`, {
                access_token: googleToken
            });
            
            const jwtToken = res.data.key;
            await SecureStore.setItemAsync('userToken', jwtToken);
            setToken(jwtToken);
            await buscarDadosDoUsuario(jwtToken);
        } catch (error) {
            console.error("Erro na validação do backend:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await SecureStore.deleteItemAsync('userToken');
        setToken(null);
        setUserData(null);
    };

    return {
        userData,
        loading,
        token,
        request,
        promptAsync,
        handleLogout
    };
}