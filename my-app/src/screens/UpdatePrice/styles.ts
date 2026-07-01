import { StyleSheet } from 'react-native';
import { radius, spacing, typography } from '../../theme/tokens';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
        gap: spacing.md,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTextContainer: {
        flex: 1,
    },
    headerTitle: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
    },
    headerSubtitle: {
        fontSize: typography.size.sm,
        marginTop: 2,
    },
    headerSpacer: {
        width: 40,
        height: 40,
    },
    content: {
        flexGrow: 1,
        paddingBottom: spacing.xl,
    },
});