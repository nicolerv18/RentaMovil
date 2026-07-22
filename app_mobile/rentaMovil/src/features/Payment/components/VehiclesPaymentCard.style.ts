import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
    StyleSheet.create({

        image: {
            width: "100%",
            height: 180,
            borderRadius: 12,
        },

        content: {
            marginTop: 16,
        },

        name: {
            fontSize: 20,
            fontWeight: "700",
            color: colors.text,
        },

        price: {
            marginTop: 4,
            fontSize: 16,
            fontWeight: "600",
            color: colors.primary,
        },

        toggleButton: {
            marginTop: 20,
        },

        toggleText: {
            color: colors.primary,
            fontWeight: "600",
            fontSize: 15,
        },

        details: {
            marginTop: 20,
            gap: 16,
        },

        section: {
            gap: 4,
        },

        label: {
            fontSize: 14,
            color: colors.textSecondary,
        },

        value: {
            fontSize: 16,
            color: colors.text,
            fontWeight: "500",
        },

    });