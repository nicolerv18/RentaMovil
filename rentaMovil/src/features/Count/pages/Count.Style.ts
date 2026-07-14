    import { StyleSheet } from "react-native";

    export const CountStyles = (colors: any) =>
    StyleSheet.create({
        container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
        paddingTop: 25,
        },

        // FOTO
        photoContainer: {
        alignItems: "center",
        marginBottom: 25,
        },

        image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: colors.primary,
        },

        selectButton: {
        marginTop: 12,
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: colors.primary,
        },

        selectButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
        },

        // CONFIGURACIÓN
        settingsButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.card,
        padding: 16,
        borderRadius: 14,
        marginBottom: 18,
        elevation: 2,
        },

        settingsTitle: {
        fontSize: 17,
        fontWeight: "700",
        color: colors.text,
        },

        arrow: {
        fontSize: 18,
        color: colors.textSecondary,
        },

        settingItem: {
        marginVertical: 10,
        },

        settingLabel: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 8,
        color: colors.text,
        },

        // TARJETAS
        sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.text,
        marginBottom: 18,
        },

        inputContainer: {
        marginBottom: 18,
        },

        label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.textSecondary,
        marginBottom: 6,
        },

        input: {
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 15,
        color: colors.text,
        },

        // CAMBIAR CONTRASEÑA
        passwordButton: {
        marginTop: 8,
        alignSelf: "flex-start",
        },

        passwordText: {
        color: colors.primary,
        fontWeight: "600",
        fontSize: 15,
        },

        // BOTONES
        buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25,
        marginBottom: 35,
        gap: 12,
        },

        editButton: {
        flex: 1,
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        },

        buttonEditar: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
        },

        outCesionButton: {
        flex: 1,
        backgroundColor: "#E53935",
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: "center",
        },

        outCesionButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
        },
    content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 40,
    backgroundColor: colors.background,
    },
    });