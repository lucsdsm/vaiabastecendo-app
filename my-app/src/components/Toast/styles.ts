import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 9999,
    },
    message: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 10,
        flex: 1,
    },
});
