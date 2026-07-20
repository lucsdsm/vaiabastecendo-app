import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { useToast } from './ToastContext';

const AUTH_TOKEN_STORAGE_KEY = 'userToken';

export interface AuthUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email?: string;
  photo: string | null;
  likes_received?: number;
  likes_given?: number;
  verified?: boolean;
  points?: number;
}

interface AuthContextValue {
  token: string | null;
  user: AuthUser | null;
  isInitializingAuth: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: AuthUser | null) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * Provedor global de autenticação.
 * Centraliza token, perfil do usuário e ações de login/logout.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { showToast } = useToast();

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isInitializingAuth, setIsInitializingAuth] = useState(true);

  /**
   * Mantém a referência mais atual do token sem quebrar a estabilidade
   * das funções memoizadas que dependem dele.
   */
  const tokenRef = useRef<string | null>(null);

  useEffect(() => {
    tokenRef.current = token;
  }, [token]);

  const fetchCurrentUser = useCallback(async (authToken: string) => {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/profile/`, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });

    const apiUser = response.data;

    setUser({
      id: apiUser.id,
      username: apiUser.username,
      first_name: apiUser.first_name ?? '',
      last_name: apiUser.last_name ?? '',
      email: apiUser.email ?? '',
      photo: apiUser.photo ?? null,
      likes_received: apiUser.likes_received ?? 0,
      likes_given: apiUser.likes_given ?? 0,
      verified: apiUser.verified ?? false,
      points: apiUser.points ?? 0,
    });
  }, []);

  const refreshUser = useCallback(async () => {
    const currentToken = tokenRef.current;

    if (!currentToken) {
      setUser(null);
      return;
    }

    try {
      await fetchCurrentUser(currentToken);
    } catch (error) {
      console.error('Falha ao atualizar os dados do usuário autenticado:', error);
    }
  }, [fetchCurrentUser]);

  const signIn = useCallback(
    async (nextToken: string) => {
      await SecureStore.setItemAsync(AUTH_TOKEN_STORAGE_KEY, nextToken);
      setToken(nextToken);

      try {
        await fetchCurrentUser(nextToken);
        showToast('Login realizado com sucesso.', 'success');
      } catch (error) {
        await SecureStore.deleteItemAsync(AUTH_TOKEN_STORAGE_KEY);
        setToken(null);
        setUser(null);
        console.error('Falha ao carregar o perfil após o login:', error);
        showToast('Não foi possível concluir o login.', 'danger');
        throw error;
      }
    },
    [fetchCurrentUser, showToast]
  );

  const signOut = useCallback(async () => {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
    showToast('Você saiu da sua conta.', 'info');
  }, [showToast]);

  const updateUser = useCallback((nextUser: AuthUser | null) => {
    setUser(nextUser);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      try {
        const storedToken = await SecureStore.getItemAsync(AUTH_TOKEN_STORAGE_KEY);

        if (!storedToken) {
          return;
        }

        if (isMounted) {
          setToken(storedToken);
        }

        await fetchCurrentUser(storedToken);
      } catch (error) {
        console.error('Falha ao inicializar a autenticação:', error);
        await SecureStore.deleteItemAsync(AUTH_TOKEN_STORAGE_KEY);

        if (isMounted) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsInitializingAuth(false);
        }
      }
    }

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [fetchCurrentUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isInitializingAuth,
      signIn,
      signOut,
      updateUser,
      refreshUser,
    }),
    [token, user, isInitializingAuth, signIn, signOut, updateUser, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook de acesso seguro ao contexto de autenticação.
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider.');
  }

  return context;
}