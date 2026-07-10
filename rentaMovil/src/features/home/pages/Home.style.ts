
import { StyleSheet } from "react-native";

export const HomeStyles = (colors: any) =>
    StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: colors.background,
        marginTop: 20,
        },

        content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        },

        headerContainer: {
        paddingBottom: 10,
        },
    });