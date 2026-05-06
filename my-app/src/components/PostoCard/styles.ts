import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 24,
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 12,
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
        marginBottom: 16,
    },
    headerLeft: {
        flex: 1,
        gap: 4,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    logoContainer: {
        width: 40,
        height: 40,
        borderRadius: 360,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 32,
        height: 32,
        borderRadius: 360,
        resizeMode: 'contain',
    },
    emojiContainer: {
        justifyContent: 'center',
        alignItems: 'center',     
    },
    emojiText: {
        fontSize: 24,
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: -0.4,
    },
    addressText: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 18,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginTop: 8,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 12,
        fontWeight: '500',
    },
    metaDivider: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        opacity: 0.3,
    },
    directionsButton: {
        width: 36,
        height: 36,
        borderRadius: 12,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceContainer: {
        gap: 10,
    },
    priceRow: {
        flexDirection: 'row',
        gap: 10,
    },
    priceBlock: {
        flex: 1,
    },
    priceBadge: {
        borderRadius: 16,
        padding: 14,
        minHeight: 100,
        justifyContent: 'space-between',
    },
    priceBadgeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    fuelLabelContainer: {
        flex: 1,
    },
    fuelLabel: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.6,
    },
    priceValue: {
        fontSize: 26,
        fontWeight: '700',
        letterSpacing: -1,
        textAlign: 'center',
        marginVertical: 4,
    },
    priceUnit: {
        fontSize: 13,
        fontWeight: '500',
        letterSpacing: -0.3,
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        alignSelf: 'center',
    },
    likeCount: {
        fontSize: 11,
        fontWeight: '600',
    },
    noPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1.5,
        borderStyle: 'dashed',
        gap: 12,
    },
    noPriceTextContainer: {
        flex: 1,
    },
    noPriceTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
    },
    noPriceText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
    },
    updateInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
    },
    updateText: {
        fontSize: 11,
        fontWeight: '500',
    },
    authorText: {
        fontSize: 11,
        fontWeight: '600',
    },
});
