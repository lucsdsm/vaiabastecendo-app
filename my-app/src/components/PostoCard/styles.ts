import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 20,
        padding: 20,
        marginBottom: 12,
        borderWidth: 1,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
        gap: 12,
    },
    headerLeft: {
        flex: 1,
        gap: 6,
    },
    addressText: {
        fontSize: 12,
        fontWeight: '400',
        marginTop: -2,
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: -0.3,
    },
    infoBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    distanceText: {
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.2,
    },
    timeText: {
        fontSize: 12,
        fontWeight: '500',
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
    },
    likeCount: {
        fontSize: 12,
        fontWeight: '600',
    },
    priceContainer: {
        gap: 12,
        marginBottom: 20,
    },
    priceRow: {
        flexDirection: 'row',
        gap: 12,
    },
    priceBlock: {
        flex: 1,
    },
    priceBadge: {
        borderRadius: 16,
        padding: 16,
        minHeight: 112,
        justifyContent: 'space-between',
        gap: 8,
    },
    fuelLabelContainer: {
        minHeight: 32,
        justifyContent: 'center',
    },
    noPriceContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderStyle: 'dashed',
        gap: 12,
    },
    noPriceText: {
        flex: 1,
        fontSize: 13,
        lineHeight: 18,
        fontWeight: '500',
    },
    fuelLabel: {
        fontSize: 11,
        lineHeight: 14,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        textAlign: 'center',
        includeFontPadding: false,
    },
    priceValue: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
    },
    directionsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 9,
        borderRadius: 12,
        borderWidth: 1,
    },
    updateInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        flex: 1,
    },
    updateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 12,
    },
    updateButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
});
