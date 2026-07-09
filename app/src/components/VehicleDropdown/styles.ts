import { StyleSheet } from 'react-native';
import { spacing, radius, typography, elevation, iconSize  } from '../../theme/tokens';

export const styles = StyleSheet.create({
    dropdownOverlay: {
        position: 'absolute',
        top: 65,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
    },
    dropdownContent: {
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
    dropdownPointer: {
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
    vehicleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    vehicleItemText: {
        flex: 1,
        fontSize: 15,
        marginLeft: 12,
        fontWeight: '500',
    },
    addVehicleModalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    addVehicleModalText: {
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 8,
    },
});