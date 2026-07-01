import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { themes } from "../../../theme/themes";
import { useTheme } from "../../../theme/useTheme";
import { HomeStyles } from "./Home.style";


import FilterModal, {
  Filters,
} from "../../../shared/components/filter/FilterModal";
import FilterCalendar, { SearchData } from "../components/Filter";

import { vehicleService } from "../../vehicles/services/vehicleService";
import VehicleCard from "../components/VehicleCard";

import SelectLanguage from "../../../shared/components/select/selectLanguage";
import ThemeSelector from "../../../shared/components/select/selectTheme";

import { Vehicle } from "../../../types/vehicles";
import { useReservation } from "../../Reservation/context/ReservationContext";

export default function HomePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [searchData, setSearchData] = useState<{
    branch: string;
    startDate: Date;
    endDate: Date;
  } | null>(null);

  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    brand: "",
    type: "",
    transmission: "",
    minPrice: 0,
    maxPrice: 1000000,
    search: "",
  });

  const { createReservation } = useReservation();

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const data = await vehicleService.getVehicles();
    setVehicles(data);
  };

const handleSearch = (data: SearchData) => {
  const { branch, startDate, endDate } = data;

  console.log("Sucursal seleccionada:", branch); // objeto completo
  console.log("Nombre:", branch.name);
  console.log("ID:", branch.id);
  console.log("Fecha inicio:", startDate);
  console.log("Fecha fin:", endDate);

};
  const handleApplyFilters = async () => {
    setShowFilters(false);

    const filtered = await vehicleService.getVehicles(filters);

    setVehicles(filtered);
  };

  const handleClearFilters = async () => {
    const reset: Filters = {
      brand: "",
      type: "",
      transmission: "",
      minPrice: 0,
      maxPrice: 1000000,
      search: "",
    };

    setFilters(reset);

    const data = await vehicleService.getVehicles();
    setVehicles(data);
  };

  const handleContinue = (vehicle: Vehicle) => {
    console.log("Entró a handleContinue");

    console.log(vehicle);

    console.log(searchData);

    if (!searchData) {
      console.log("No hay búsqueda");
      return;
    }

    createReservation(
      vehicle,
      vehicle.branch,
      vehicle.branch,
      searchData.startDate,
      searchData.endDate
    );

    console.log("Reserva creada");

    router.push("/reservation");
  };

  const { themeName } = useTheme();
  const colors = themes[themeName];
  const styles = HomeStyles(colors);

  return (
    <>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <VehicleCard
            vehicle={item}
            onContinue={handleContinue}
          />
        )}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <SelectLanguage />

            <ThemeSelector />

            <FilterCalendar
              onSearch={handleSearch}
            />

            <TouchableOpacity
              onPress={() => setShowFilters(true)}
              style={{
                marginTop: 10,
                padding: 12,
                backgroundColor: "#ddd",
                borderRadius: 10,
              }}
            >
              <Text>Filtrar vehículos</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </>
  );
}