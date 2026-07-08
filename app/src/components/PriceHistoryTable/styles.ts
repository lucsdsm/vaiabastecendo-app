import { StyleSheet } from 'react-native';
import { spacing, typography, radius } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: typography.size.lg,
        fontWeight: 'bold',
        paddingHorizontal: spacing.sm,
        marginBottom: spacing.md,
        paddingTop: spacing.xl,
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