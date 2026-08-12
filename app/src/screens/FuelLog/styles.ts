import { StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginHorizontal: spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        position: 'relative',
        minHeight: 55,
    },
    action: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },
    wrapper: {
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
    title: {
        fontSize: typography.size.xl,
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        bottom: 100,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5,
    }
});