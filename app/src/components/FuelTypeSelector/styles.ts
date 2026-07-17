import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    label: {
        fontSize: typography.size.xs + 1,
        fontWeight: typography.weight.semibold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: spacing.md,
        marginLeft: spacing.sm,
    },
    scroll: {
        flexGrow: 0,
        borderRadius: radius.lg,
    },
    scrollContent: {
        gap: spacing.sm,
        paddingRight: spacing.xs,
        paddingVertical: 4,
    },
    chipBase: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        borderRadius: radius.pill,
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
    chipDot: {
        width: spacing.sm,
        height: spacing.sm,
        borderRadius: radius.sm / 2,
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