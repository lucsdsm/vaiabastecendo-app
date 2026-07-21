import { StyleSheet } from 'react-native';
import { spacing, typography, radius } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: typography.size.xs + 1,
        fontWeight: typography.weight.semibold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginLeft: spacing.sm,
        marginBottom: spacing.sm,
    },
    chartWrapper: {
        paddingRight: spacing.lg,
        paddingLeft: spacing.sm,
        alignItems: 'center',
    },
    loadingContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
});