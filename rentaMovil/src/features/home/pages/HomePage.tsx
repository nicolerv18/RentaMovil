import { StyleSheet, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import {HomeStyles} from "./Home.style";
import { useTheme } from "../../../theme/useTheme";
import { themes } from "../../../theme/themes";

import FilterCalendar from "../components/Filter";
import VehicleCard from "../components/VehicleCard";

import { vehicleService } from "../services/vehicleService";

import { Vehicle } from "../../../types/vehicles";
import SelectLanguage from "../../../shared/components/select/selectLanguage";
import selectTheme from "../../../shared/components/select/selectTheme";
import ThemeSelector from "../../../shared/components/select/selectTheme";

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

    console.log("Buscando vehículos en sucursal:", data.branch);

    const filteredVehicles =
      await vehicleService.getVehicles({
        branch: data.branch,
      });

    setVehicles(filteredVehicles);
  };

  
      const { themeName } = useTheme();
  
      const colors = themes[themeName];
  
      const styles = HomeStyles(colors);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <SelectLanguage />
      <ThemeSelector />
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

