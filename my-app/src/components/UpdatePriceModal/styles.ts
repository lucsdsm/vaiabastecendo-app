import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 25,
    },
    section: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
    },
    fuelGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    fuelOption: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 2,
    },
    fuelOptionText: {
        fontWeight: '700',
        fontSize: 14,
    },
    input: {
        borderRadius: 15,
        padding: 18,
        fontSize: 24,
        fontWeight: '800',
        textAlign: 'center',
        borderWidth: 1,
    },
    submitButton: {
        borderRadius: 15,
        padding: 18,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
