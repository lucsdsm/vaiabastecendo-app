import { StyleSheet } from 'react-native';
import { spacing, radius, typography, elevation, iconSize  } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        position: 'relative',
        minHeight: 56,
    },
    headerActionButton: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    headerTitleContainer: {
        position: 'absolute',
        left: 60,
        right: 60,
        top: 0,
        bottom: 0,
        flexDirection: 'row',    
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: 1,
    },
    headerTitle: {
        fontSize: typography.size.xl,
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    }
});