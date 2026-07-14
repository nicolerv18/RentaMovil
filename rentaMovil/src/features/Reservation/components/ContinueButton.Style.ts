    import { StyleSheet } from "react-native";

    export const createStyles = (colors: any) =>
    StyleSheet.create({
        button: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        marginVertical: 10,
        },

        text: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        },
    });