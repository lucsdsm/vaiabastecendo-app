import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'danger' | 'info';

interface ToastContextData {
    showToast: (message: string, type?: ToastType) => void;
    hideToast: () => void;
    toastData: { message: string; type: ToastType; visible: boolean };
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toastData, setToastData] = useState({ message: '', type: 'info' as ToastType, visible: false });

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        setToastData({ message, type, visible: true });
    }, []);

    const hideToast = useCallback(() => {
        setToastData((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast, hideToast, toastData }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);