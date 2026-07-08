import { useState, useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';

/**
 * Hook para escutar os eventos do teclado e calcular o padding necessário.
 * Permite que componentes ajustem seu layout evitando sobreposição.
 */
export function useKeyboardPadding() {
    const [keyboardPadding, setKeyboardPadding] = useState(0);

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showSubscription = Keyboard.addListener(showEvent, (e) => {
            setKeyboardPadding(e.endCoordinates.height);
        });

        const hideSubscription = Keyboard.addListener(hideEvent, () => {
            setKeyboardPadding(0);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return { keyboardPadding, setKeyboardPadding };
}
