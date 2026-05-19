import { StyleSheet, Text, View } from "react-native";
import FilterCalendar from "../components/Filter";

export default function HomePage() {

  const handleSearch = (data: {
  branch: string;
  startDate: Date;
  endDate: Date;
}) => {
  console.log(data);
};
  return (
    <View style={styles.container}>
      <FilterCalendar onSearch={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1EFE8",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1a2e4a",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },
});