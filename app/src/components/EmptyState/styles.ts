import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: spacing.lg,
        paddingHorizontal: spacing.xxl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
    },
    title: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    message: {
        fontSize: typography.size.sm,
        textAlign: 'center',
        marginBottom: spacing.xxl,
        lineHeight: 20,
    },
    buttonBase: {
        minHeight: 44,
        borderRadius: radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
        paddingHorizontal: spacing.xl,
    },
    buttonSM: {
        minHeight: 36,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
    },
    buttonMD: {
        paddingVertical: spacing.md,
    },
    buttonLG: {
        paddingVertical: spacing.lg,
    },
    buttonPRIMARY: {},
    buttonSECONDARY: {},
    buttonGHOST: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonPressed: {
        opacity: 0.85,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    buttonIcon: {
        marginRight: 0,
    },
    buttonLabel: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.bold,
        letterSpacing: typography.letterSpacing.tight,
    },
});
