import { Platform, StyleSheet } from 'react-native';
import { radius, spacing, typography, elevation } from '../../theme/tokens';

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
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.12,
                shadowRadius: 24,
            },
            android: {
                elevation: elevation.low,
            },
        }),
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: radius.md,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
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
