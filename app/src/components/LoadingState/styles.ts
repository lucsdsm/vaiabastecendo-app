import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        gap: 16,
    },

    iconRing: {
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
    },

    iconCore: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },

    message: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 0.1,
    },
});
