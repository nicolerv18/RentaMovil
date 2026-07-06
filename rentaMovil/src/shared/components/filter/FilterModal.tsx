import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { vehicles } from "../../../features/vehicles/data/vehicles";
import { styles } from "./FilterModalStyle";

export interface Filters {
  brand: string;
  category: string;
  transmission: string;
  minPrice: number;
  maxPrice: number;
  search: string;
}

interface Props {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly filters: Filters;
  readonly setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  readonly onApply: () => void;
  readonly onClear: () => void;
}

export default function FilterModal({
  visible,
  onClose,
  filters,
  setFilters,
  onApply,
  onClear,
}: Props) {

const transmissions = [...new Set(vehicles.map(v => v.transmission))];
const categories = [...new Set(vehicles.map(v => v.category))];
const brand = [...new Set(vehicles.map(v => v.brand))];

  const selectTransmission = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      transmission: prev.transmission === value ? "" : value,
    }));
  };

  const toggleCategory = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === value ? "" : value,
    }));
  };

    const togglebrand = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      brand : prev.brand === value ? "" : value,
    }));
  };


  const updatePrice = (key: "minPrice" | "maxPrice", value: string) => {
    const num = value === "" ? 0 : Number(value);

    setFilters((prev) => ({
      ...prev,
      [key]: Number.isNaN(num) ? 0 : num,
    }));
  };

  const isValidPrice = filters.minPrice <= filters.maxPrice;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >

        <View style={styles.overlay}>
          <View style={styles.container}>

            <View style={styles.header}>
              <Text style={styles.title}>Filtros</Text>

              <TouchableOpacity onPress={onClose}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 20 }}
              >

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Precio</Text>

                  <View style={styles.priceContainer}>
                    <View style={styles.priceInputContainer}>
                      <Text style={styles.label}>Mínimo</Text>

                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={String(filters.minPrice)}
                        onChangeText={(text) =>
                          updatePrice("minPrice", text)
                        }
                      />
                    </View>

                    <Text style={styles.priceSeparator}>—</Text>

                    <View style={styles.priceInputContainer}>
                      <Text style={styles.label}>Máximo</Text>

                      <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={String(filters.maxPrice)}
                        onChangeText={(text) =>
                          updatePrice("maxPrice", text)
                        }
                      />
                    </View>
                  </View>

                  {!isValidPrice && (
                    <Text style={{ color: "red", marginTop: 5 }}>
                      El precio mínimo no puede ser mayor al máximo
                    </Text>
                  )}
                </View>

                {/* TRANSMISSION */}
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Transmisión</Text>

                  {transmissions.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.option}
                      onPress={() => selectTransmission(item)}
                    >
                      <Text style={styles.optionText}>
                        {filters.transmission.includes(item) ? "✔️" : "⬜"} {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Marca</Text>
                  {brand.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.option}
                      onPress={() => togglebrand(item)}
                    >
                      <Text style={styles.optionText}>
                        {filters.brand.includes(item) ? "✔️" : "⬜"} {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Categoría</Text>

                  {categories.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.option}
                      onPress={() => toggleCategory(item)}
                    >
                      <Text style={styles.optionText}>
                        {filters.category === item ? "✔️" : "⬜"} {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

              </ScrollView>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={styles.clearButton}
                onPress={onClear}
              >
                <Text style={styles.clearButtonText}>Limpiar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.applyButton,
                  !isValidPrice && { opacity: 0.5 },
                ]}
                disabled={!isValidPrice}
                onPress={onApply}
              >
                <Text style={styles.applyButtonText}>Aplicar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </KeyboardAvoidingView>
    </Modal>
  );
}