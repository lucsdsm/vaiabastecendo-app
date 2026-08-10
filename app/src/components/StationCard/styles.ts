import { Platform, StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    base: {
        borderRadius: radius.xl,
        padding: spacing.lg,
    },
    badge: {
        paddingHorizontal: spacing.xs,
        paddingVertical: spacing.xs,
        borderRadius: radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.semibold,
    },
    card: {
        width: '100%',
        marginBottom: spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    left: {
        flex: 1,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    container: {
        width: 40,
        height: 40,
        borderRadius: radius.sm,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
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
    address: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.semibold,
        lineHeight: 16,
        flex: 1,
    },
    direction: {
        width: 40,
        height: 40,
        borderRadius: radius.md,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: 2,
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    rating: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.bold,
    },
    scroll: {
        gap: spacing.md,
        paddingRight: spacing.lg,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    block: {
        width: 125,
    },
    emblem: {
        borderRadius: radius.lg,
        padding: spacing.md,
        minHeight: 104,
        justifyContent: 'space-between',
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fuel: {
        flex: 1,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: typography.size.sm,
        lineHeight: 18,
        fontWeight: typography.weight.semibold,
        letterSpacing: typography.letterSpacing.normal,
        textAlign: 'center',
    },
    value: {
        fontSize: typography.size.xxl,
        fontWeight: typography.weight.bold,
        letterSpacing: typography.letterSpacing.normal,
        textAlign: 'center',
        marginVertical: spacing.xs,
    },
    like: {
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
    count: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.semibold,
    },

    noprice: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        borderRadius: radius.lg,
        gap: spacing.md,
    },
    hero: {
        width: 36,
        height: 36,
        borderRadius: radius.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    words: {
        flex: 1,
    },
    caption: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.semibold,
    },
    message: {
        fontSize: typography.size.xs,
        lineHeight: 16,
        fontWeight: typography.weight.regular,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.lg,
    }
});