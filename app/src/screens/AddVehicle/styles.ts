import { Platform, StyleSheet } from 'react-native';
import { radius, spacing, typography, elevation } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        minHeight: 56,
        position: 'relative',
    },
    headerActionButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    headerRightActions: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 2,
    },
    headerTitleContainer: {
        position: 'absolute',
        left: 50,  
        right: 90,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    headerTitle: {
        fontSize: typography.size.xl,
        fontWeight: typography.weight.bold,
    },

    scrollContent: {
        flexGrow: 1,
    },
    cardContent: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xl,
        flex: 1,
    },
    section: {
        marginTop: spacing.xl,
    },
    label: {
        fontSize: typography.size.xs + 1,
        fontWeight: typography.weight.semibold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: spacing.sm,
        marginLeft: spacing.sm,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: radius.lg,
        borderWidth: 1.5,
        paddingHorizontal: spacing.md,
        paddingVertical: 4,
    },
    textInput: {
        flex: 1,
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
        paddingVertical: spacing.md,
    },
    numberInput: {
        flex: 1,
        fontSize: typography.size.hero + 4,
        fontWeight: typography.weight.bold,
        textAlign: 'center',
        paddingVertical: spacing.md,
        letterSpacing: -1,
    },
    currencySuffix: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.medium,
        marginLeft: spacing.sm,
    },
    button: {
        borderRadius: radius.lg,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: spacing.sm,
    },
    buttonText: {
        fontSize: typography.size.md,
        fontWeight: typography.weight.bold,
        letterSpacing: -0.2,
    },
});