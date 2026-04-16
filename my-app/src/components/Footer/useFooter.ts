import { useState } from 'react';

import { useAppTheme } from '../../theme/ThemeProvider';

/**
 * Centraliza estado de tema e controle do modal de perfil no rodape.
 */
export function useFooter() {
    const { colors } = useAppTheme();
    const [profileModalVisible, setProfileModalVisible] = useState(false);

    const openProfileModal = () => setProfileModalVisible(true);
    const closeProfileModal = () => setProfileModalVisible(false);

    return {
        colors,
        profileModalVisible,
        openProfileModal,
        closeProfileModal,
    };
}
