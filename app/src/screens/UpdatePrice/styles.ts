import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spacing.md,
    },
    content: {
        gap: spacing.xl,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        minHeight: 55,
    },
    back: {
        width: 40,
        height: 40,
        borderRadius: radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        flex: 1,
    },
    title: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
    },
    subtitle: {
        fontSize: typography.size.sm,
        marginTop: 2,
    },
    spacer: {
        width: 40,
        height: 40,
    },
});