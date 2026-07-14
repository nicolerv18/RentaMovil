    import { StyleSheet } from "react-native";


    export const filterStyles =(colors: any) =>
    
    StyleSheet.create({
    filter: {
        backgroundColor: colors.backgroundCard,
        padding: 16,
        gap: 12,
        borderRadius: 16,
        marginTop: 10,
    },
    row: {
        flexDirection: "row",
        gap: 10,
    },
    field: {
        flex: 1,
        flexDirection: "column",
        gap: 4,
    },
    fieldFull: {
        flexDirection: "column",
        gap: 4,
    },
    labelFilter: {
        marginLeft: 6,
        fontSize: 12,
        color: colors.text,
    },
    inputContainer: {
        borderWidth: 1.5,
        borderColor: colors.input,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors.input,
        fontSize: 14,
        color: colors.text,
    },
    inputInvalid: {
        borderColor: colors.error,
    },
    btnSearch: {
        backgroundColor: colors.button,
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 4,
    },
    btnSearchText: {
        color: colors.buttonText,
        fontSize: 16,
        fontWeight: "600",
    },
    sucursalDropdown: {
        borderWidth: 1,
        borderColor: colors.card,
        borderRadius: 16,
        backgroundColor: colors.card,
        maxHeight: 150,
    },
    sucursalDropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 14,
        color: colors.text,
    },
    error: {
        color: colors.error,
        marginLeft: 6,
        fontSize: 11,
        marginTop: 2,
    },
    });