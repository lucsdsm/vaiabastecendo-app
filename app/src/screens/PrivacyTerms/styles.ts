import { StyleSheet } from "react-native";
import {
  elevation,
  iconSize,
  radius,
  spacing,
  typography,
} from "@theme/tokens";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
  },
  title: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    marginTop: spacing.sm,
  },
  updated: {
    fontSize: typography.size.xs,
    fontWeight: typography.weight.medium,
  },
  subtitle: {
    fontSize: typography.size.sm,
    fontWeight: typography.weight.bold,
    marginTop: spacing.md,
  },
  description: {
    fontSize: typography.size.sm,
    lineHeight: 21,
  },
  paragraph: {
    fontSize: typography.size.sm,
    lineHeight: 22,
    textAlign: "justify",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: radius.pill,
    marginTop: 8,
  },
  text: {
    flex: 1,
    fontSize: typography.size.sm,
    lineHeight: 22,
    textAlign: "justify",
  },
  divider: {
    width: "100%",
    height: 1,
    marginVertical: spacing.md,
  },
});
