import { Alert, Linking } from 'react-native';
import Constants from 'expo-constants';
import { useAppTheme } from '../../theme/ThemeProvider';
import { useToast } from '../../contexts/ToastContext';

export function useVersion() {
    const { colors, toggleTheme, isDark } = useAppTheme();
    const { showToast } = useToast();
    
    const currentYear = new Date().getFullYear();
    const appVersion = Constants.expoConfig?.version || '1.0.0';

    const handleOpenLink = async (url: string) => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            showToast('Não foi possível abrir o link.', 'danger');
        }
    };

    return {
        colors,
        currentYear,
        isDark,
        appVersion,
        handleOpenLink,
    };
}