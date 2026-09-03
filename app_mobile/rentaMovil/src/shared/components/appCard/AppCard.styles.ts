import { StyleSheet } from "react-native";

import { Radius } from "../../../theme/constants/radius";
import { createCardShadow } from "../../../theme/constants/shadows";
import { Spacing } from "../../../theme/constants/spacing";

export const createStyles = (colors: any) =>

    StyleSheet.create({

        card: {

            backgroundColor: colors.card,

            borderRadius: Radius.lg,

            padding: Spacing.lg,

            marginVertical: Spacing.sm,

            ...createCardShadow(colors),

        },

    });
