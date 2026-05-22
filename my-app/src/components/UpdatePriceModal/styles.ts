import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        paddingTop: 8,
        paddingHorizontal: 20,
        paddingBottom: 40,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.08,
                shadowRadius: 20,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    handle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.4,
    },
    closeButton: {
        width: 36,
        height: 36,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 24,
    },
    section: {
        marginBottom: 24,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 12,
    },

    // --- Fuel scroll ---
    fuelScroll: {
        flexGrow: 0,
    },
    fuelScrollContent: {
        gap: 8,
        paddingRight: 4,
    },
    fuelChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 50,
        borderWidth: 1.5,
    },
    fuelChipDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    fuelChipText: {
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: -0.1,
    },

    // --- Price input ---
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1.5,
        paddingHorizontal: 20,
        paddingVertical: 4,
    },
    currencyPrefix: {
        fontSize: 18,
        fontWeight: '600',
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        paddingVertical: 16,
        letterSpacing: -1,
    },
    currencySuffix: {
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 8,
    },

    // --- Submit ---
    submitButton: {
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: -0.2,
    },
});
