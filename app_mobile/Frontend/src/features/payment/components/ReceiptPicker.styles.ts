import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 4,
    },

    subtitle: {
      fontSize: 14,
      color: colors.secondaryText,
      marginBottom: 18,
    },

    placeholder: {
      height: 120,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.border,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.background,
    },

    placeholderText: {
      fontSize: 15,
      fontWeight: "600",
      color: colors.primary,
    },

    preview: {
      width: "100%",
      height: 220,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },

    actions: {
      flexDirection: "row",
      gap: 12,
      marginTop: 12,
    },

    action: {
      flex: 1,
      paddingVertical: 12,
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
    },

    dangerAction: {
      borderColor: colors.error,
    },

    actionText: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
    },

    dangerText: {
      color: colors.error,
    },
  });
