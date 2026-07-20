import { Platform, StyleSheet } from 'react-native';
import { radius, spacing, typography, elevation } from '../../theme/tokens';

export const styles = StyleSheet.create({
    localCardBase: {
        borderRadius: radius.xl,
        padding: spacing.lg,
        borderWidth: 1,
    },
    badge: {
        paddingHorizontal: spacing.xs,
        paddingVertical: spacing.xs,
        borderRadius: radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    badgeIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.semibold,
    },
    card: {
        width: '100%',
        marginBottom: spacing.md,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.04,
                shadowRadius: 12,
            },
            android: {
                elevation: elevation.low,
            },
        }),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    headerLeft: {
        flex: 1,
        gap: spacing.xs,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    logoContainer: {
        width: 40,
        height: 40,
        borderRadius: radius.sm,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 32,
        height: 32,
        borderRadius: radius.sm,
        resizeMode: 'contain',
    },
    title: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
        letterSpacing: typography.letterSpacing.normal,
    },
    addressText: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.regular,
        lineHeight: 16,
        flex: 1,
    },
    directionsButton: {
        width: 40,
        height: 40,
        borderRadius: radius.md,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: 2,
    },
    ratingInlineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    ratingText: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.bold,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 0,
    },
    priceContainer: {
    },
    pricesScrollContent: {
        gap: spacing.md,
        paddingRight: spacing.lg,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceBlock: {
        width: 125,
    },
    priceBadge: {
        borderRadius: radius.lg,
        padding: spacing.md,
        minHeight: 104,
        justifyContent: 'space-between',
    },
    priceBadgeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fuelLabelContainer: {
        flex: 1,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fuelLabel: {
        fontSize: typography.size.sm,
        lineHeight: 18,
        fontWeight: typography.weight.semibold,
        letterSpacing: typography.letterSpacing.normal,
        textAlign: 'center',
    },
    priceValue: {
        fontSize: typography.size.xxl,
        fontWeight: typography.weight.bold,
        letterSpacing: typography.letterSpacing.normal,
        textAlign: 'center',
        marginVertical: spacing.xs,
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: radius.pill,
        alignSelf: 'center',
        minHeight: 12,
        minWidth: 12,
    },
    likeCount: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.semibold,
    },

    noPriceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        borderRadius: radius.lg,
        borderWidth: 1.5,
        borderStyle: 'dashed',
        gap: spacing.md,
    },
    noPriceIconContainer: {
        width: 36,
        height: 36,
        borderRadius: radius.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noPriceTextContainer: {
        flex: 1,
    },
    noPriceTitle: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.semibold,
    },
    noPriceText: {
        fontSize: typography.size.xs,
        lineHeight: 16,
        fontWeight: typography.weight.regular,
    },
    updateInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.lg,
    },
    updateIcon: {
        marginRight: spacing.xs,
    },
    updateText: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.medium,
    },
    metaText: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.medium,
    },
    authorText: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.semibold,
    },
});