import { Platform, StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.xs,
        ...Platform.select({
            ios: {
                // shadowColor: '#000',
                // shadowOffset: { width: 0, height: 2 },
                // shadowOpacity: 0.1,
                // shadowRadius: 4,
            },
            android: {
                // elevation: 4,
            },
        }),
        zIndex: 10,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginLeft: spacing.xl,
        marginTop: spacing.sm,
    },
    titleContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        fontSize: typography.size.hero,
        fontWeight: typography.weight.black,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.regular,
        lineHeight: 20,
    },
    // characterImage: {
    //     width: 96,
    //     height: 96,
    // },
    themeButtonContainer: {
        padding: spacing.xs,
    },
    themeButton: {
        width: 44,
        height: 44,
        borderRadius: radius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    themeButtonPressed: {
        opacity: 0.7,
    },
});
