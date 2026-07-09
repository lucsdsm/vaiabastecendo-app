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
        marginTop: spacing.xl,
        marginBottom: spacing.xl,
    },
    label: {
        fontSize: typography.size.xs + 1, // 13
        fontWeight: typography.weight.semibold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: spacing.md,
        marginLeft: spacing.sm,
    },
    fuelScroll: {
        flexGrow: 0,
        borderRadius: radius.lg,
    },
    fuelScrollContent: {
        gap: spacing.sm,
        paddingRight: spacing.xs,
    },
    fuelChip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        paddingHorizontal: spacing.lg,
        paddingVertical: 10,
        borderRadius: radius.pill,
        borderWidth: 1.5,
    },
    fuelChipDot: {
        width: spacing.sm,
        height: spacing.sm,
        borderRadius: radius.sm / 2, // 4
    },
    fuelChipText: {
        fontSize: typography.size.xs + 1,
        fontWeight: typography.weight.semibold,
        letterSpacing: -0.1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: radius.xl - 4, // 20
        borderWidth: 1.5,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.xs,
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
        paddingVertical: spacing.lg,
        letterSpacing: -1,
    },
    currencySuffix: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.medium,
        marginLeft: spacing.sm,
    },
});
