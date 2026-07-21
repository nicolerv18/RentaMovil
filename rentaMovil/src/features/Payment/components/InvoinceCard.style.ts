import { StyleSheet } from "react-native";


export const createStyles = (colors: any) =>

    StyleSheet.create({

        header: {

            flexDirection: "row",

            justifyContent:
                "space-between",

            alignItems:
                "center",

        },


        title: {

            fontSize: 20,

            fontWeight: "700",

            color:
                colors.text,

        },


        subtitle: {

            marginTop: 4,

            fontSize: 13,

            color:
                colors.textSecondary,

        },


        arrow: {

            fontSize: 18,

            fontWeight: "700",

            color:
                colors.primary,

        },


        content: {

            marginTop: 20,

        },


        vehicleSection: {

            paddingBottom: 16,

            borderBottomWidth: 1,

            borderBottomColor:
                colors.border,

        },


        vehicleName: {

            fontSize: 17,

            fontWeight: "700",

            color:
                colors.text,

        },


        vehicleDescription: {

            marginTop: 4,

            fontSize: 13,

            color:
                colors.textSecondary,

        },


        row: {

            flexDirection: "row",

            justifyContent:
                "space-between",

            alignItems:
                "center",

            paddingVertical: 14,

        },


        label: {

            fontSize: 15,

            fontWeight: "600",

            color:
                colors.text,

        },


        description: {

            marginTop: 3,

            fontSize: 13,

            color:
                colors.textSecondary,

        },


        value: {

            fontSize: 16,

            fontWeight: "600",

            color:
                colors.text,

        },


        separator: {

            height: 1,

            backgroundColor:
                colors.border,

            marginTop: 4,

        },


        totalRow: {

            flexDirection: "row",

            justifyContent:
                "space-between",

            alignItems:
                "center",

            paddingTop: 18,

        },


        totalLabel: {

            fontSize: 18,

            fontWeight: "700",

            color:
                colors.text,

        },


        total: {

            fontSize: 24,

            fontWeight: "800",

            color:
                colors.primary,

        },

    });