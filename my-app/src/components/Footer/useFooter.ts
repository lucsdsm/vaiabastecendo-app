import { useState } from 'react';

import { useAppTheme } from '../../theme/ThemeProvider';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Centraliza estado de tema e controle do modal de perfil no rodape.
 */
export function useFooter() {
    const { colors, toggleTheme } = useAppTheme();
    const { userData } = useAuth();
    const [profileModalVisible, setProfileModalVisible] = useState(false);

    const openProfileModal = () => setProfileModalVisible(true);
    const closeProfileModal = () => setProfileModalVisible(false);

    return {
        userData,
        colors,
        toggleTheme,
        profileModalVisible,
        openProfileModal,
        closeProfileModal,
    };
}
