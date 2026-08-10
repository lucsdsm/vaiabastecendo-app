import { Platform, StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: spacing.xl,
        right: spacing.xl,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.sm,
        borderRadius: radius.lg,
        zIndex: 9999,
    },
    icon: {
        width: 36,
        height: 36,
        borderRadius: radius.md,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        flex: 1,
        marginLeft: spacing.sm,
    },
    title: {
        color: '#FFF',
        fontSize: typography.size.xs,
        fontWeight: typography.weight.bold,
        letterSpacing: typography.letterSpacing.wide,
        marginBottom: 2,
    },
    message: {
        color: '#FFF',
        fontSize: typography.size.sm,
        fontWeight: typography.weight.semibold,
        letterSpacing: typography.letterSpacing.tight,
        lineHeight: 18,
    },
});
