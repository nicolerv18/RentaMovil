import {
    StyleSheet,
} from "react-native";

export function createStyles(
    colors: any
) {

    return StyleSheet.create({

        container: {

            paddingHorizontal:
                20,

            paddingTop:
                24,

            paddingBottom:
                12,

        },

        title: {

            fontSize:
                28,

            fontWeight:
                "700",

            color:
                colors.text,

            margin:20,

        },

        subtitle: {

            marginTop:
                6,

            fontSize:
                15,

            color:
                colors.secondaryText,

        },

        count: {

            marginTop:
                12,

            fontSize:
                14,

            fontWeight:
                "600",

            color:
                colors.primary,

        },

    });

}