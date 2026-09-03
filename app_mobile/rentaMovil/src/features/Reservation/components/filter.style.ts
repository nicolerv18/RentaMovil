import {
    StyleSheet,
} from "react-native";

export function createStyles(
    colors: any
) {

    return StyleSheet.create({

        container: {

            flexDirection: "row",
            flexWrap: "wrap",

            paddingHorizontal: 20,

            paddingVertical: 16,

            gap: 9,

        },

        button: {

            paddingHorizontal: 14,

            paddingVertical: 9,

            borderRadius: 999,

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
                colors.buttonText,

            fontWeight:
                "700",

        },

    });

}
