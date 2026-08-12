import { StyleSheet } from "react-native";
import { elevation, iconSize, radius, spacing, typography } from '@theme/tokens';

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
    minHeight: 55,
  },
  actions: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  scroll: {
    flexGrow: 1,
    marginHorizontal: spacing.md,
  },
  section: {
    gap: 10,
    flex: 1
  },
  title: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    marginTop: spacing.sm
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
  card: {
    gap: 12,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  labels: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
  radius: {
    flexDirection: "row",
    gap: 8,
  },
});
