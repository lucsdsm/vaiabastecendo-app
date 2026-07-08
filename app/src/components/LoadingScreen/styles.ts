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
    gaugeContainer: {
        width: 200,
        height: 100, 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: spacing.md,
    },
    gaugeBackground: {
        width: 200,
        height: 200, 
        borderRadius: 100,
        borderWidth: 2,
        borderBottomWidth: 0, 
        position: 'absolute',
        top: 0,
    },
    gaugeLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 160,
        position: 'absolute',
        bottom: 5,
    },
    labelText: {
        fontSize: typography.size.md,
        fontWeight: typography.weight.bold,
    },
    needleWrapper: {
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
    needleCenter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        position: 'absolute',
        bottom: -10, 
    }
});
