import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import { useToast } from './ToastContext';

interface UserData {
    id: number;
    username: string;
    primeiro_nome: string;
    ultimo_nome: string;
    foto: string | null;
    likes_recebidos?: number;
    likes_deferidos?: number;
}

interface AuthContextData {
    token: string | null;
    userData: UserData | null;
    loading: boolean;
    signIn: (jwtToken: string) => Promise<void>;
    signOut: () => Promise<void>;
    updateUserData: (data: UserData | null) => void;
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

    const fetchUserData = async (authToken: string) => {
        try {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/auth/me/`, {
                headers: { Authorization: `Token ${authToken}` }
            });
            setUserData(res.data);
        } catch (error) {
            console.error('Erro ao carregar dados do usuario:', error);
        }
    };

    const signIn = async (jwtToken: string) => {
        await SecureStore.setItemAsync('userToken', jwtToken);
        setToken(jwtToken);
        await fetchUserData(jwtToken);
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
            try {
                const savedToken = await SecureStore.getItemAsync('userToken');
                if (savedToken) {
                    setToken(savedToken);
                    await fetchUserData(savedToken);
                }
            } finally {
                setLoading(false);
            }
        };
        inicializarAuth();
    }, []);

    const updateUserData = (data: UserData | null) => {
        setUserData(data);
    };

    return (
        <AuthContext.Provider value={{ token, userData, loading, signIn, signOut, updateUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook de acesso ao estado de autenticacao da aplicacao.
 * Deve ser usado dentro de AuthProvider.
 */
export const useAuth = () => useContext(AuthContext);