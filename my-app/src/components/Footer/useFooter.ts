import { useState } from 'react';
import { useNavigationState } from '@react-navigation/native';

import { useAppTheme } from '../../theme/ThemeProvider';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

/**
 * Centraliza estado de tema e controle do modal de perfil no rodape.
 */
export function useFooter() {
    const { colors, toggleTheme } = useAppTheme();
    const { userData } = useAuth();
    const { showToast } = useToast();
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const activeRoute = useNavigationState((state) => state?.routes[state.index]?.name || 'Home');

    const openProfileModal = () => setProfileModalVisible(true);
    const closeProfileModal = () => setProfileModalVisible(false);
    const handleOpenMap = () => {
        showToast('Mapa em breve.', 'info');
    };

    return {
        userData,
        colors,
        toggleTheme,
        profileModalVisible,
        openProfileModal,
        closeProfileModal,
        activeRoute,
        handleOpenMap,
    };
}
