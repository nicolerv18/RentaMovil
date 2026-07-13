    import { StyleSheet } from "react-native";

    import { Radius } from "../../../theme/constants/radius";
    import { Spacing } from "../../../theme/constants/spacing";
    import { Typography } from "../../../theme/constants/typography";

    export const createStyles = (colors: any) =>
    StyleSheet.create({
        title: {
        fontSize: Typography.h3,
        fontWeight: "700",
        color: colors.text,
        marginBottom: Spacing.lg,
        },

        option: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.md,

        borderRadius: Radius.lg,
        borderWidth: 1,
        borderColor: colors.border,

        marginBottom: Spacing.md,

        backgroundColor: colors.card,
        },

        optionSelected: {
        borderColor: colors.primary,
        backgroundColor: colors.primary + "15",
        },

        optionInfo: {
        flex: 1,
        marginRight: Spacing.md,
        },

        optionTitle: {
        fontSize: Typography.body,
        fontWeight: "700",
        color: colors.text,
        },

        optionDescription: {
        marginTop: 4,
        fontSize: Typography.caption,
        color: colors.textSecondary,
        },

        radio: {
        fontSize: 22,
        fontWeight: "700",
        color: colors.primary,
        },
    });