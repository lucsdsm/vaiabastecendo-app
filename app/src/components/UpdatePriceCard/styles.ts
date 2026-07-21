import { Platform, StyleSheet } from 'react-native';
import { radius, spacing, typography, elevation } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardShell: {
        flex: 1,
        justifyContent: 'center',
    },
    cardContent: {
    },
    section: {
        paddingVertical: spacing.md,
    },
    label: {
        paddingHorizontal: spacing.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: radius.xl - 4,
        borderWidth: 1.5,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.sm,
        marginTop: spacing.xs,
    },
    currencyPrefix: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.semibold,
        marginRight: spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: typography.size.hero + 4, // 32
        fontWeight: typography.weight.bold,
        textAlign: 'center',
        letterSpacing: -1,
    },
    currencySuffix: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.medium,
        marginLeft: spacing.sm,
    },
});
