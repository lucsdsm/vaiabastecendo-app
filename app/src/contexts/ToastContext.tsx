import React, { createContext, useCallback, useContext, useState } from 'react';

export type ToastType = 'success' | 'danger' | 'info';

export interface ToastState {
  message: string;
  type: ToastType;
  visible: boolean;
}

interface ToastContextValue {
  toastState: ToastState;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * Provedor global de notificações toast.
 * Mantém um estado único para mensagens de feedback da aplicação.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toastState, setToastState] = useState<ToastState>({
    message: '',
    type: 'info',
    visible: false,
  });

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    setToastState({
      message,
      type,
      visible: true,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToastState((previousState) => ({
      ...previousState,
      visible: false,
    }));
  }, []);

  return (
    <ToastContext.Provider value={{ toastState, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

/**
 * Hook de acesso ao estado e ações de toast.
 * Deve ser usado dentro de ToastProvider.
 */
export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider.');
  }

  return context;
}