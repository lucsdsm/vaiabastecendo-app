import { useState } from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';

import { useAppTheme } from '../../theme/ThemeProvider';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Centraliza estado de tema e controle do modal de perfil no rodape.
 */
export function useFooter() {
    const { colors, toggleTheme } = useAppTheme();
    const { userData } = useAuth();
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const activeRoute = useNavigationState((state) => state?.routes[state.index]?.name || 'StationList');
    const navigation = useNavigation<any>();

    const openProfileModal = () => setProfileModalVisible(true);
    const closeProfileModal = () => setProfileModalVisible(false);
    const handleOpenMap = () => {
        navigation.navigate('Map');
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
