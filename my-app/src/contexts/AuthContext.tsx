import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

interface AuthContextData {
    token: string | null;
    userData: { primeiro_nome: string; ultimo_nome: string; foto: string } | null;
    loading: boolean;
    signIn: (jwtToken: string) => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    const buscarDadosDoUsuario = async (jwtToken: string) => {
        try {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/auth/me/`, {
                headers: { Authorization: `Token ${jwtToken}` }
            });
            setUserData(res.data);
        } catch (error) {
            console.error("Erro ao buscar perfil:", error);
        }
    };

    const signIn = async (jwtToken: string) => {
        await SecureStore.setItemAsync('userToken', jwtToken);
        setToken(jwtToken);
        await buscarDadosDoUsuario(jwtToken);
    };

    const signOut = async () => {
        await SecureStore.deleteItemAsync('userToken');
        setToken(null);
        setUserData(null);
    };

    useEffect(() => {
        SecureStore.getItemAsync('userToken').then(savedToken => {
            if (savedToken) {
                setToken(savedToken);
                buscarDadosDoUsuario(savedToken);
            }
            setLoading(false);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ token, userData, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);