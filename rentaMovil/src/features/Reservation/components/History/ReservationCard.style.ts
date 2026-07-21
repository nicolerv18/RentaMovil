import { StyleSheet } from "react-native";

export function createStyles(colors: any) {

    return StyleSheet.create({

        card: {

            backgroundColor:
                colors.card,

            borderRadius:
                16,

            padding:
                16,

            marginBottom:
                16,

            borderWidth:
                1,

            borderColor:
                colors.border,

        },

        header: {

            flexDirection:
                "row",

            justifyContent:
                "space-between",

            alignItems:
                "center",

            marginBottom:
                16,

        },

        vehicleName: {

            fontSize:
                18,

            fontWeight:
                "700",

            color:
                colors.text,

        },

        status: {

            fontSize:
                13,

            fontWeight:
                "600",

            color:
                colors.primary,

        },

        divider: {

            height:
                1,

            backgroundColor:
                colors.border,

            marginVertical:
                12,

        },

        row: {

            flexDirection:
                "row",

            justifyContent:
                "space-between",

            marginBottom:
                10,

        },

        label: {

            fontSize:
                13,

            color:
                colors.secondaryText,

        },

        value: {

            fontSize:
                14,

            fontWeight:
                "600",

            color:
                colors.text,

            maxWidth:
                "60%",

            textAlign:
                "right",

        },

        totalContainer: {

            flexDirection:
                "row",

            justifyContent:
                "space-between",

            alignItems:
                "center",

            marginTop:
                8,

        },

        totalLabel: {

            fontSize:
                15,

            fontWeight:
                "600",

            color:
                colors.text,

        },

        total: {

            fontSize:
                20,

            fontWeight:
                "700",

            color:
                colors.primary,

        },

    });

}