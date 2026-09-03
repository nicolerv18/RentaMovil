import { router } from "expo-router";
import { useState } from "react";
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


import { Vehicle } from "../../../types/vehicles";
import { useReservation } from "../../Reservation/context/ReservationContext";

export default function HomePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const hasSearched = searchData !==null;
  const [emptyMessage, setEmptyMessage] = useState(
    "Primero debe realizar una búsqueda."
  );

  const [filters, setFilters] = useState<Filters>({
    brand: "",
    model: "",
    category: "",
    fuelType: "",
    minPrice: 0,
    maxPrice: 1000000,
    search: "",
  });

  const { createReservation } = useReservation();

  const runSearch = async (currentSearchData: SearchData | null, currentFilters: Filters) => {
    if (!currentSearchData) {
      setVehicles([]);
      setEmptyMessage("Primero debe realizar una búsqueda.");
      return;
    }

    setEmptyMessage("");

    const filteredVehicles = await vehicleService.getVehicles({
      ...currentFilters,
      branch: currentSearchData.branch,
      startDate: currentSearchData.startDate,
      endDate: currentSearchData.endDate,
    });

    setVehicles(filteredVehicles);

    if (filteredVehicles.length === 0) {
      setEmptyMessage("No hay vehículos disponibles para los filtros seleccionados.");
    } else {
      setEmptyMessage("");
    }
  };

  const handleSearch = async (data: SearchData) => {
    setSearchData(data);
    await runSearch(data, filters);
  };

  const handleApplyFilters = async () => {
    setShowFilters(false);
    await runSearch(searchData, filters);
  };

  const handleClearFilters = async () => {
    const reset: Filters = {
      brand: "",
      model: "",
      category: "",
      fuelType: "",
      minPrice: 0,
      maxPrice: 1000000,
      search: "",
    };

    setFilters(reset);

    if (searchData) {
      await runSearch(searchData, reset);
      return;
    }

    setVehicles([]);
    setShowFilters(true);

    setEmptyMessage("Primero debe realizar una búsqueda.");
  };

  const handleContinue = (vehicle: Vehicle) => {
    if (!searchData) {
      return;
    }

    createReservation(
      vehicle,
      searchData.branch,
      searchData.branch,
      searchData.startDate,
      searchData.endDate
    );

    router.push("/reservation");
  };

  const { themeName } = useTheme();
  const colors = themes[themeName as keyof typeof themes];
  const styles = HomeStyles(colors);

  return (
    <>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <VehicleCard vehicle={item} onContinue={handleContinue} />
        )}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>{emptyMessage}</Text>
          </View>
        }
        ListHeaderComponent={
          <View>
            <FilterCalendar onSearch={handleSearch} />

            {hasSearched && (
            <TouchableOpacity
              onPress={() => setShowFilters(true)}
              style={{
                marginTop: 10,
                padding: 12,
                backgroundColor: "#d9d8d8",
                borderRadius: 10,
                marginBottom :10,
              }}
            >
              <Text>Filtrar vehículos</Text>
            </TouchableOpacity>
            )}
          </View>
        }
      />

      { hasSearched && (
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        setFilters={setFilters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />)}
    </>
  );
}
