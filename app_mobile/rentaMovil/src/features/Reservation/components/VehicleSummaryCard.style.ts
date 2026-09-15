import { StyleSheet } from "react-native";

import { Spacing } from "../../..//theme/constants/spacing";
import { Typography } from "../../..//theme/constants/typography";
import { Radius } from "../../../theme/constants/radius";

export const createStyles = (colors: any) =>
  StyleSheet.create({

    image: {

      width: "100%",

      height: 190,

      borderRadius: Radius.md,

    },

    content: {

      marginTop: Spacing.lg,

    },

    name: {

      color: colors.text,

      fontSize: Typography.h2,

      fontWeight: "700",

    },

    model: {

      color: colors.textSecondary,

      marginTop: Spacing.xs,

      fontSize: Typography.body,

    },

    infoContainer: {

      marginTop: Spacing.lg,

      rowGap: Spacing.sm,

    },

    info: {

      color: colors.text,

      fontSize: Typography.body,

    },

    price: {

      marginTop: Spacing.xl,

      color: colors.primary,

      fontSize: Typography.h2,

      fontWeight: "700",

    },

  });