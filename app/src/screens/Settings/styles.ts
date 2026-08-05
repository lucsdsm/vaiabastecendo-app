import { StyleSheet } from "react-native";
import { spacing, typography, radius } from "../../theme/tokens";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    position: "relative",
    marginTop: spacing.md,
  },
  headerActionButton: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  scrollContent: {
    flexGrow: 1,
    marginHorizontal: spacing.md,
  },
  settingsButton: {
    borderRadius: radius.md,
    padding: spacing.md,
    marginVertical: spacing.sm,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  settingsButtonText: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.semibold,
  },
  section: {
    marginTop: spacing.md,
    gap: 10,
  },

  sectionTitle: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
  },

  sectionDescription: {
    fontSize: 13,
    lineHeight: 18,
  },

  sliderCard: {
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },

  slider: {
    width: "100%",
    height: 40,
  },

  sliderValue: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },

  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sliderLabel: {
    fontSize: 12,
    fontWeight: "600",
  },

  radiusContainer: {
    flexDirection: "row",
    gap: 8,
  },

  radiusButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
