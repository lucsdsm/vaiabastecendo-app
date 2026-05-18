import { Platform, StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    card: {
        width: '100%',
        marginBottom: spacing.lg,
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
        marginBottom: spacing.md,
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
        borderRadius: radius.pill,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
        width: 32,
        height: 32,
        borderRadius: radius.pill,
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
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
        letterSpacing: typography.letterSpacing.tight,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        minWidth: 0,
    },
    addressText: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.regular,
        lineHeight: 18,
        flex: 1,
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
        fontSize: typography.size.xs,
        fontWeight: typography.weight.medium,
    },
    metaDivider: {
        width: 3,
        height: 3,
        borderRadius: 1.5,
        opacity: 0.3,
    },
    directionsButton: {
        width: 44,
        height: 44,
        borderRadius: radius.md,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    priceContainer: {
        gap: spacing.md,
    },
    priceRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    priceBlock: {
        flex: 1,
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
        alignItems: 'flex-start',
    },
    fuelLabelContainer: {
        flex: 1,
    },
    fuelLabel: {
        fontSize: typography.size.xs,
        lineHeight: 14,
        fontWeight: typography.weight.bold,
        textTransform: 'uppercase',
        letterSpacing: typography.letterSpacing.wide,
    },
    priceValue: {
        fontSize: typography.size.xxl,
        fontWeight: typography.weight.bold,
        letterSpacing: typography.letterSpacing.tighter,
        textAlign: 'center',
        marginVertical: spacing.xs,
    },
    priceUnit: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.medium,
        letterSpacing: typography.letterSpacing.tight,
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.pill,
        alignSelf: 'center',
        minHeight: 44,
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
    noPriceTextContainer: {
        flex: 1,
    },
    noPriceTitle: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.semibold,
        marginBottom: 2,
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
        marginTop: spacing.md,
        paddingTop: spacing.md,
        borderTopWidth: 1,
        gap: spacing.xs,
    },
    updateText: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.medium,
    },
    authorText: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.semibold,
    },
});
