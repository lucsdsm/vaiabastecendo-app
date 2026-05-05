import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        ...Platform.select({
            android: {
                elevation: 999,
            },
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 0,
            },
        }),
    },
    content: {
        alignItems: 'center',
        width: '80%',
    },
    logo: {
        width: 296,
        height: 296,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    progressBarContainer: {
        width: '100%',
        height: 8,
        borderRadius: 4,
        borderWidth: 1,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 4,
    },
});
