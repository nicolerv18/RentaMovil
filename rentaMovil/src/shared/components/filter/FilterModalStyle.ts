    import { StyleSheet } from "react-native";

    export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.4)",
    },

    container: {
        height: "90%",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        backgroundColor: "#FFF",
        padding: 20,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        fontSize: 24,
        fontWeight: "700",
    },

    close: {
        fontSize: 24,
    },

    content: {
        flex: 1,
        paddingVertical: 20,
    },

    section: {
        marginBottom: 24,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 12,
        color: "#333",
    },

    option: {
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginVertical: 4,
        borderRadius: 8,
        backgroundColor: "#F5F5F5",
    },

    optionText: {
        fontSize: 14,
        color: "#333",
    },

    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
    },

    priceInputContainer: {
        flex: 1,
    },

    label: {
        fontSize: 12,
        color: "#666",
        marginBottom: 6,
    },

    input: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        color: "#333",
    },

    priceSeparator: {
        fontSize: 18,
        color: "#999",
        marginTop: 20,
    },

    footer: {
        flexDirection: "row",
        gap: 12,
        justifyContent: "space-between",
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: "#EEE",
    },

    clearButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#DDD",
        alignItems: "center",
    },

    clearButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#666",
    },

    applyButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: "#007AFF",
        alignItems: "center",
    },

    applyButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFF",
    },
    
    });