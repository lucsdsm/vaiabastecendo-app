import React, { createContext, ReactNode, useCallback, useContext, useState, useMemo } from 'react';

export type ToastType = 'success' | 'danger' | 'info' | 'confirm';

interface ToastState {
  visible: boolean;
  type: ToastType;
  title?: string;
  message: string;
  duration: number;
  confirmText?: string;
  onConfirm?: () => void;
}

interface ShowToastOptions {
  type?: ToastType;
  title?: string;
  duration?: number;
  confirmText?: string;
  onConfirm?: () => void;
}

interface ToastContextData {
  toastState: ToastState;
  showToast: (message: string, options?: ShowToastOptions) => void;
  hideToast: () => void;
}

const DEFAULT_TOAST_STATE: ToastState = {
  visible: false,
  type: 'info',
  message: '',
  duration: 3000,
};

const ToastContext = createContext<ToastContextData | undefined>(undefined);

/**
 * Provedor global de notificações toast.
 * Mantém um estado único para mensagens de feedback da aplicação.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toastState, setToastState] = useState<ToastState>(DEFAULT_TOAST_STATE);

  const showToast = useCallback(
    (message: string, options: ShowToastOptions = {}) => {
      setToastState({
        visible: true,
        type: options.type ?? 'info',
        title: options.title,
        message,
        duration: options.duration ?? 3000,
        confirmText: options.confirmText,
        onConfirm: options.onConfirm,
      });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToastState(DEFAULT_TOAST_STATE);
  }, []);

  const value = useMemo(
    () => ({
      toastState,
      showToast,
      hideToast,
    }),
    [hideToast, showToast, toastState]
  );

  return (
    <ToastContext.Provider value={value}>
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