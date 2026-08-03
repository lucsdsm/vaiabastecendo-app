import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    label: {
        fontSize: typography.size.xs + 1,
        fontWeight: typography.weight.semibold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginLeft: spacing.sm,
        marginBottom: spacing.sm,
    },
    emptyText: {
        fontWeight: typography.weight.regular,
        marginLeft: spacing.sm,
        lineHeight: 20,
        textAlign: 'left',
    },
    scroll: {
        flexGrow: 0,
        borderRadius: radius.md,
    },
    scrollContent: {
        gap: spacing.sm,
        paddingRight: spacing.xs,
    },
    chipBase: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        borderRadius: radius.md,
        borderWidth: 1.5,
    },
    chipCompact: {
        paddingHorizontal: spacing.lg,
        paddingVertical: 10,
    },
    chipRegular: {
        paddingHorizontal: spacing.lg,
        paddingVertical: 12,
    },
    chipTextBase: {
        fontWeight: typography.weight.semibold,
        letterSpacing: -0.1,
    },
    chipTextCompact: {
        fontSize: typography.size.xs + 1,
    },
    chipTextRegular: {
        fontSize: typography.size.sm,
    },
    checkIcon: {
        marginLeft: 2,
    },
});