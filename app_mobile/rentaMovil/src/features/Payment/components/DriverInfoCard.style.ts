import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
    StyleSheet.create({

        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },

        title: {
            fontSize: 20,
            fontWeight: "700",
            color: colors.text,
        },

        arrow: {
            fontSize: 18,
            color: colors.primary,
            fontWeight: "700",
        },

        content: {
            marginTop: 20,
            gap: 4,
        },

        label: {
            fontSize: 14,
            fontWeight: "600",
            color: colors.textSecondary,
            marginTop: 8,
        },

        input: {
            height: 48,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 10,
            paddingHorizontal: 14,
            fontSize: 16,
            color: colors.text,
            backgroundColor: colors.background,
            marginBottom: 8,
        },

        disabledInput: {
            opacity: 0.7,
        },

    });