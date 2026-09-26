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

    accountsContainer: {
      gap: 12,
    },

    accountCard: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 14,
      backgroundColor: colors.background,
    },

    selectedAccount: {
      borderColor: colors.primary,
      borderWidth: 2,
    },

    accountInfo: {
      flex: 1,
      paddingRight: 12,
    },

    bankName: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 4,
    },

    accountType: {
      fontSize: 13,
      color: colors.secondaryText,
    },

    accountNumber: {
      marginTop: 6,
      fontSize: 15,
      fontWeight: "600",
      color: colors.text,
      letterSpacing: 0.5,
    },

    holder: {
      marginTop: 2,
      fontSize: 12,
      color: colors.secondaryText,
    },

    radio: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },

    radioSelected: {
      borderColor: colors.primary,
    },

    radioDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.primary,
    },
  });
