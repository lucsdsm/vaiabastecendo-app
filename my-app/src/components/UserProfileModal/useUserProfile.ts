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
        scheme: 'com.lucsdsm.vaiabastecendo',
    });

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
        redirectUri: redirectUri,
    });

    /**
     * Busca os dados do usuario autenticado usando o token JWT fornecido pelo backend
     */
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

    /**
     * Ao abrir o modal, verifica se ja existe um token salvo e, se houver, tenta carregar os dados do usuario.
     * Tambem monitora as respostas do fluxo de autenticacao do Google para obter o token e buscar os dados do usuario
     */
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
            await SecureStore.setItemAsync('userToken', jwtToken);
            setToken(jwtToken);
            await buscarDadosDoUsuario(jwtToken);
        } catch (error) {
            console.error("Erro na validação do backend:", error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Limpa o token salvo e os dados do usuario para efetuar logout
     */
    const handleLogout = async () => {
        await SecureStore.deleteItemAsync('userToken');
        setToken(null);
        setUserData(null);
    };

    /**
     * Funcao de mock login para desenvolvimento, que simula a obtencao de um token JWT valido e o processo de login sem passar pela autenticacao real do Google. 
     * O token usado aqui deve ser um token JWT valido gerado pelo backend para um usuario de teste.
     */
    const handleMockLogin = () => {
        if (__DEV__) {
            const mockToken = "ya29.a0Aa7MYiofnESqwVL2wyhIMdaMvztTo46VD2VdKeGsAjRLz1xtPO-Z_PutoquxfMoiWF8u0GhNG96mDEy9nnMnEYHSHuNS0nkOEFIVekps0IieLH7P2RQF0tJz-7g5dECGfF_FINxu0scBkvvFdciSDW9rtcl2-fyCahyKgXWkKcc61rx-rjjUlQwGNjVlQh2VvhVFwwQaCgYKAVcSARQSFQHGX2Mi_AWOXbbARjyxieBlwR10eg0206"
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