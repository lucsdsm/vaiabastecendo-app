import { StyleSheet } from 'react-native';
import { radius, spacing, typography, elevation } from '../../theme/tokens';

export const styles = StyleSheet.create({
    card: {
        borderRadius: radius.md,
        borderWidth: 1,
        marginBottom: 16,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: radius.sm,
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
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
    },
    metricBlock: {
        flex: 1,
    },
    metricDivider: {
        width: 1,
        height: '80%',
        alignSelf: 'center',
        marginHorizontal: spacing.sm,
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
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderTopWidth: 1,
    },
    footerRightGroup: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'flex-end', 
        alignItems: 'center',
        gap: spacing.sm, 
    },
    distanceText: {
        fontSize: 12,
        marginTop: 2,
        opacity: 0.7,
        marginLeft: 18,
    },
    odometerContainer: {
        flexShrink: 0, 
        marginRight: spacing.sm,
        justifyContent: 'center',
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
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: 'bold',
    },
});