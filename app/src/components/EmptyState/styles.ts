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
    title: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    message: {
        fontSize: typography.size.sm,
        textAlign: 'center',
        marginBottom: spacing.md,
        lineHeight: 20,
    }
});
