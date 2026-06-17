
import { StyleSheet } from "react-native";

export const HomeStyles =  (colors: any) =>

    StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        padding: 20,
        paddingBottom: 40,
    },

    cardsContainer: {
        marginTop: 25,
        gap: 20,
    },
});