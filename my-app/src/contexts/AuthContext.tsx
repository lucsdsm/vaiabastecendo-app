import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import { useToast } from './ToastContext';

interface UserData {
    primeiro_nome: string;
    ultimo_nome: string;
    foto: string;
}

interface AuthContextData {
    token: string | null;
    userData: UserData | null;
    loading: boolean;
    signIn: (jwtToken: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

/**
 * Provedor global de autenticacao.
 * Centraliza persistencia de token, perfil e feedback de login/logout via toast.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { showToast } = useToast();
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    const buscarDadosDoUsuario = async (jwtToken: string) => {
        try {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/auth/me/`, {
                headers: { Authorization: `Token ${jwtToken}` }
            });
            setUserData(res.data);
        } catch (error) {
            console.error("Erro ao buscar perfil:", error);
            showToast('Erro ao buscar perfil', 'danger');
            // Se o perfil falha com token presente, limpamos sessao para evitar estado inconsistente.
            signOut();
        }
    };

    const signIn = async (jwtToken: string) => {
        await SecureStore.setItemAsync('userToken', jwtToken);
        setToken(jwtToken);
        await buscarDadosDoUsuario(jwtToken);
        showToast('Login realizado com sucesso!', 'success');
    };

    const signOut = async () => {
        await SecureStore.deleteItemAsync('userToken');
        setToken(null);
        setUserData(null);
        showToast('Você saiu da sua conta.', 'info');
    };

    useEffect(() => {
        const inicializarAuth = async () => {
            const savedToken = await SecureStore.getItemAsync('userToken');
            if (savedToken) {
                setToken(savedToken);
                await buscarDadosDoUsuario(savedToken);
            }
            setLoading(false);
        };
        inicializarAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ token, userData, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook de acesso ao estado de autenticacao da aplicacao.
 * Deve ser usado dentro de AuthProvider.
 */
export const useAuth = () => useContext(AuthContext);