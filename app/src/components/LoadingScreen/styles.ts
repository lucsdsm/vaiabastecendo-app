import { Platform, StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
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
    gauge: {
        width: 200,
        height: 115,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: spacing.md,
    },
    background: {
        width: 200,
        height: 200, 
        borderRadius: 100,
        borderWidth: 2,
        borderBottomWidth: 0, 
        position: 'absolute',
        top: 0,
    },
    labels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 160,
        position: 'absolute',
        bottom: 0,
    },
    label: {
        fontSize: typography.size.md,
        fontWeight: typography.weight.bold,
    },
    wrapper: {
        width: 200,
        height: 200, 
        position: 'absolute',
        top: 0,
        alignItems: 'center',
        justifyContent: 'flex-start', 
    },
    needle: {
        width: 6,
        height: 85,
        borderRadius: 3,
        marginTop: 15,
    },
    center: {
        width: 20,
        height: 20,
        borderRadius: 10,
        position: 'absolute',
        top: 90, 
        alignSelf: 'center',
    }
});
