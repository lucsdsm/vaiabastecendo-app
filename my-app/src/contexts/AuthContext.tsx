import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

import { useToast } from './ToastContext';

interface UserData {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
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

    const signIn = async (jwtToken: string) => {
        await SecureStore.setItemAsync('userToken', jwtToken);
        setToken(jwtToken);
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
            }
            setLoading(false);
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