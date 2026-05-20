import { StyleSheet, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";

import FilterCalendar from "../components/Filter";
import VehicleCard from "../components/VehicleCard";

import { vehicleService } from "../services/vehicleService";

import { Vehicle } from "../../../types/vehicles";

export default function HomePage() {

  const [vehicles, setVehicles] =
    useState<Vehicle[]>([]);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {

    const data =
      await vehicleService.getVehicles();

    setVehicles(data);
  };

  const handleSearch = async (data: {
    branch: string;
    startDate: Date;
    endDate: Date;
  }) => {

    const filteredVehicles =
      await vehicleService.getVehicles({
        branch: data.branch,
      });

    setVehicles(filteredVehicles);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <FilterCalendar
        onSearch={handleSearch}
      />

      <View style={styles.cardsContainer}>

        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
          />
        ))}

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1EFE8",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  cardsContainer: {
    marginTop: 25,
    gap: 20,
  },
});