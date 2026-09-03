    import { StyleSheet } from "react-native";

    export const createStyles = (colors: any) =>
    StyleSheet.create({

        title: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 15,
        color: colors.text,
        },

        option: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 10,
        },

        selected: {
        borderColor: colors.primary,
        backgroundColor: colors.primary + "15",
        },

        optionTitle: {
        fontWeight: "600",
        fontSize: 16,
        color: colors.text,
        },

        description: {
        marginTop: 3,
        color: colors.text,
        },

        radio: {
        fontSize: 22,
        color: colors.primary,
        },

    });