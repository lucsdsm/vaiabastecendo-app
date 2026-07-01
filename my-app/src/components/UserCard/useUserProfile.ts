import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

// Necessario para concluir corretamente o fluxo de autenticacao no app nativo.
WebBrowser.maybeCompleteAuthSession();

/**
 * Gerencia autenticacao Google e carregamento do perfil do usuario.
 */
export function useUserCard() {
    const [loading, setLoading] = useState(false);
    const { token, userData, signIn, signOut, updateUserData } = useAuth();

    const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'com.lucsdsm.vaiabastecendo',
    });

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
        redirectUri: redirectUri,
    });

    /**
     * Monitora as respostas do fluxo de autenticacao do Google para obter o token e buscar os dados do usuario
     */
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

    /**
     * Envia o token de acesso do Google para o backend Django, que valida o token, cria ou atualiza 
     * o usuario e retorna um token JWT do proprio backend para ser usado nas requisicoes autenticadas
     */
    const enviarTokenParaDjango = async (googleToken: string) => {
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/google/`, {
                access_token: googleToken
            });
            
            const jwtToken = res.data.key;
            await signIn(jwtToken);
        } catch (error) {
            console.error("Erro na validação do backend:", error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Busca os dados do perfil (com likes atualizados e username) no backend.
     */
    const carregarEstatisticas = async () => {
        if (!token) return;
        
        try {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/auth/me/`, {
                headers: { Authorization: `Token ${token}` }
            });
            updateUserData(res.data);
        } catch (error) {
            console.error("Erro ao carregar estatísticas do perfil:", error);
        }
    };

    /**
     * Garante que as estatísticas sejam atualizadas 
     * toda vez que o usuário abrir esta tela de perfil.
     */
    useFocusEffect(
        useCallback(() => {
            carregarEstatisticas();
        }, [token])
    );


    /**
     * Limpa o token salvo e os dados do usuario para efetuar logout
     */
    const handleLogout = async () => {
        await signOut();
    };

    /**
     * Funcao de mock login para desenvolvimento, que simula a obtencao de um token JWT valido e o processo de login sem passar pela autenticacao real do Google. 
     * O token usado aqui deve ser um token JWT valido gerado pelo backend para um usuario de teste.
     */
    const handleMockLogin = () => {
        if (__DEV__) {
            const mockToken = "ya29.a0AT3oNZ-Ib9qeswx24GHx8i02Y7EJNCKn0h_FA1aF0rPIP1GFlolO_38HCR32ZWObsHBdgujntFu_uyQNLiSnG8sxywv13JjYI3VjSSOnnJ_uL8kfGaHotvd9w57gM6_8z0nBIYf9sffq0uh6cmEt9urnw9i_ze85maPKNagiFNAR2hjPiqdKzUXOh9rqZoK4C3wWY9oaCgYKAZsSARQSFQHGX2MiZmDHOGxGuSemiFHjmhItSw0206"
            console.log("Login simulado com token:", mockToken);
            enviarTokenParaDjango(mockToken);
        }
    }

    return {
        userData,
        loading,
        token,
        request,
        promptAsync,
        handleLogout,
        handleMockLogin,
    };
}