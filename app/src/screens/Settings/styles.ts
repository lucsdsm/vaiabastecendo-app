import { StyleSheet } from 'react-native';
import { spacing, typography, radius  } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: spacing.md,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        position: 'relative',     
    },
    headerActionButton: {
        width: 40,           
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,            
    },
    headerTitleContainer: {
        ...StyleSheet.absoluteFillObject,
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
    settingsButton: {
        borderRadius: radius.md,
        padding: spacing.md,
        marginVertical: spacing.sm,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
    },
    settingsButtonText: {
        fontSize: typography.size.md,
        fontWeight: typography.weight.bold,
    },
});