import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
        padding: spacing.xl,
        paddingBottom: spacing.xxxl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    title: {
        fontSize: typography.size.xl,
        fontWeight: typography.weight.black,
    },
    subtitle: {
        fontSize: typography.size.sm,
        marginBottom: spacing.sm,
    },
    helperText: {
        fontSize: typography.size.xs,
        marginBottom: spacing.lg,
        lineHeight: 18,
    },
    section: {
        marginBottom: spacing.xl,
    },
    label: {
        fontSize: typography.size.md,
        fontWeight: typography.weight.semibold,
        marginBottom: spacing.md,
    },
    fuelGrid: {
        gap: spacing.xs,
    },
    fuelRow: {
        flexDirection: 'row',
        gap: spacing.xs,
    },
    fuelOptionBlock: {
        flex: 1,
        minWidth: 0,
    },
    fuelOption: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderRadius: radius.lg,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 44,
    },
    fuelOptionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    fuelOptionText: {
        fontWeight: typography.weight.bold,
        fontSize: typography.size.sm,
        textAlign: 'center',
    },
});
