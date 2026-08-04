import {
    StyleSheet,
} from "react-native";

export function createStyles(
    colors: any
) {

    return StyleSheet.create({

        container: {

            flexDirection:
                "row",

            paddingHorizontal:
                16,

            paddingVertical:
                12,

            gap: 8,

        },

        button: {

            paddingHorizontal:
                16,

            paddingVertical:
                10,

            borderRadius:
                20,

            borderWidth:
                1,

            borderColor:
                colors.border,

            backgroundColor:
                colors.card,

        },

        activeButton: {

            backgroundColor:
                colors.primary,

            borderColor:
                colors.primary,

        },

        text: {

            color:
                colors.text,

            fontSize:
                14,

            fontWeight:
                "500",

        },

        activeText: {

            color:
                "#FFFFFF",

            fontWeight:
                "700",

        },

    });

}