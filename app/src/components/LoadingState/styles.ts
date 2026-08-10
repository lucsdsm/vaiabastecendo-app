import { StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
        gap: 16,
    },
    message: {
        fontSize: typography.size.md,
        fontWeight: typography.weight.bold,
        textAlign: 'center',
        letterSpacing: 0.1,
    },
});
