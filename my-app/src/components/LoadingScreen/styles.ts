import { Platform, StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        ...Platform.select({
            android: {
                elevation: 999,
            },
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.1,
                shadowRadius: 0,
            },
        }),
    },
    content: {
        alignItems: 'center',
        width: '80%',
    },
    logo: {
        width: 180,
        height: 180,
    },
    title: {
        fontSize: typography.size.xl,
        fontWeight: typography.weight.bold,
        marginBottom: spacing.sm,
        letterSpacing: typography.letterSpacing.tight,
    },
    subtitle: {
        fontSize: typography.size.sm,
        marginBottom: spacing.xxl,
        textAlign: 'center',
    },
    progressBarContainer: {
        width: '100%',
        height: 8,
        borderRadius: radius.sm,
        borderWidth: 1,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: radius.sm,
    },
});
