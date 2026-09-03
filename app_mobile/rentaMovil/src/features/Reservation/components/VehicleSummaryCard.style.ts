import { StyleSheet } from "react-native";

import { Radius } from "../../../theme/constants/radius";
import { Spacing } from "../../../theme/constants/spacing";
import { Typography } from "../../../theme/constants/typography";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    image: {
      width: "100%",
      height: 200,
      borderRadius: Radius.lg,
      resizeMode: "cover",
      marginBottom: Spacing.lg,
    },

    content: {
      gap: Spacing.sm,
    },

    name: {
      color: colors.text,
      fontSize: 24,
      fontWeight: "700",
    },

    model: {
      color: colors.text,
      fontSize: Typography.body,
      marginBottom: Spacing.md,
    },

    infoContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: Spacing.sm,
      marginVertical: Spacing.md,
    },

    badge: {
      backgroundColor: colors.cardSecondary,
      borderRadius: Radius.pill,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },

    badgeText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "600",
    },

    price: {
      marginTop: Spacing.lg,
      color: colors.primary,
      fontSize: 30,
      fontWeight: "700",
    },
  });