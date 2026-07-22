        import { StyleSheet } from "react-native";

        export const createStyles = (colors: any) =>
        StyleSheet.create({

            title: {
            fontSize: 18,
            fontWeight: "700",
            color: colors.text,
            },

            subtitle: {
            color: colors.textSecondary,
            marginBottom: 20,
            marginTop: 4,
            },

            section: {
            marginBottom: 18,
            },

            label: {
            fontWeight: "600",
            color: colors.text,
            },

            value: {
            marginVertical: 4,
            color: colors.textSecondary,
            },

            link: {
            color: colors.primary,
            fontWeight: "600",
            },

        });