import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertCard: {
        width: '100%',
        maxWidth: 340,
        borderRadius: radius.xl,
        padding: spacing.xl,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
    },
    title: {
        fontSize: typography.size.xl,
        fontWeight: typography.weight.bold,
        marginBottom: spacing.md,
        textAlign: 'center',
    },
    message: {
        fontSize: 15,
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 24,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: radius.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1.0,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});