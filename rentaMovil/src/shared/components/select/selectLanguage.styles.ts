import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  container: {
    width: "100%",
    marginVertical: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1A2E4A",
  },

  selectContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,

    elevation: 2,
  },

  picker: {
    height: 55,
    width: "100%",
  },

});