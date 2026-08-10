import { StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    label: {
        fontSize: typography.size.xs + 1,
        fontWeight: typography.weight.semibold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginLeft: spacing.sm,
        marginBottom: spacing.sm,
    },
    scroll: {
        flexGrow: 0,
        borderRadius: radius.md,
    },
    content: {
        gap: spacing.sm,
        paddingRight: spacing.xs,
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        borderRadius: radius.md,
        borderWidth: 1.5,
        paddingHorizontal: spacing.lg,
        paddingVertical: 12,
    },
    text: {
        fontWeight: typography.weight.semibold,
        fontSize: typography.size.sm,
        letterSpacing: -0.1,
    },
    checkIcon: {
        marginLeft: 2,
    },
    empty: {
        fontWeight: typography.weight.regular,
        marginLeft: spacing.sm,
        lineHeight: 20,
        textAlign: 'left',
    },
});