    import { StyleSheet } from "react-native";

    export const colors = {
        input: "#ebe9e9",
        cardBg: "#ffffff",
        border: "#2A2F6E",
        placeholder: "#c7c3c3",
        button: "#16213E",
        textBtn: "#FFFFFF",
        error: "#FF4D4D",
        label: "#000000",
        };

    export const filterStyles = StyleSheet.create({
    filter: {
        backgroundColor: colors.cardBg,
        padding: 16,
        gap: 12,
        width: "100%",
        borderRadius: 16,
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
        color: colors.label,
    },
    inputContainer: {
        borderWidth: 1.5,
        borderColor: colors.input,
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors.input,
        fontSize: 14,
        color: colors.label,
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
        color: colors.textBtn,
        fontSize: 16,
        fontWeight: "600",
    },
    sucursalDropdown: {
        borderWidth: 1,
        borderColor: colors.input,
        borderRadius: 16,
        backgroundColor: colors.input,
        maxHeight: 150,
    },
    sucursalDropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 14,
        color: colors.label,
    },
    error: {
        color: colors.error,
        marginLeft: 6,
        fontSize: 11,
        marginTop: 2,
    },
    });