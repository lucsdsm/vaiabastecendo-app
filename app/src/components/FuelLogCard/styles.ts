import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 16,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    fuelType: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 13,
        fontWeight: '500',
    },
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    metricBlock: {
        flex: 1,
    },
    metricDivider: {
        width: 1,
        height: '80%',
        alignSelf: 'center',
        marginHorizontal: 12,
        opacity: 0.5,
    },
    metricLabel: {
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    metricValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
    },
    footerRightGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
        gap: 8,
    },
    odometerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 13,
        fontWeight: '600',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
});