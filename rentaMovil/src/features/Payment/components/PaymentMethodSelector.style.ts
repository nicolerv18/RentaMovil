import {
    StyleSheet,
} from "react-native";


export const createStyles = (
    colors: any
) =>


    StyleSheet.create({


        title: {

            fontSize: 20,

            fontWeight: "700",

            color:
                colors.text,

            marginBottom: 4,

        },


        subtitle: {

            fontSize: 14,

            color:
                colors.textSecondary,

            marginBottom: 18,

        },


        methodsContainer: {

            gap: 12,

        },


        methodCard: {

            flexDirection: "row",

            alignItems: "center",

            justifyContent:
                "space-between",

            padding: 16,

            borderWidth: 1,

            borderColor:
                colors.border,

            borderRadius: 14,

            backgroundColor:
                colors.background,

        },


        selectedMethod: {

            borderColor:
                colors.primary,

            borderWidth: 2,

        },


        disabledMethod: {

            opacity: 0.5,

        },


        methodInfo: {

            flex: 1,

            paddingRight: 12,

        },


        methodName: {

            fontSize: 16,

            fontWeight: "700",

            color:
                colors.text,

            marginBottom: 4,

        },


        description: {

            fontSize: 13,

            color:
                colors.textSecondary,

        },


        unavailable: {

            marginTop: 6,

            fontSize: 12,

            fontWeight: "600",

            color:
                colors.textSecondary,

        },


        radio: {

            width: 24,

            height: 24,

            borderRadius: 12,

            borderWidth: 2,

            borderColor:
                colors.border,

            alignItems:
                "center",

            justifyContent:
                "center",

        },


        radioSelected: {

            borderColor:
                colors.primary,

        },


        radioDot: {

            width: 12,

            height: 12,

            borderRadius: 6,

            backgroundColor:
                colors.primary,

        },


    });