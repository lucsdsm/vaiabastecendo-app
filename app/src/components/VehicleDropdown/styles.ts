import { StyleSheet } from 'react-native';
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

export const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 80,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
    content: {
        alignSelf: 'center',
        width: 240,
        maxHeight: 300,
        borderRadius: 12,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        marginTop: 8, 
        elevation: elevation.low,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 2,
    },
    pointer: {
        position: 'absolute',
        top: -8,
        alignSelf: 'center',
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    text: {
        flex: 1,
        fontSize: 15,
        marginLeft: 12,
        fontWeight: '500',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    modal: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 8,
    },
});