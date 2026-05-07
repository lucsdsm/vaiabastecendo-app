import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 5,
        borderRadius: 20,
        zIndex: 9999,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 24,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        flex: 1,
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: -0.2,
        lineHeight: 20,
    },
});
