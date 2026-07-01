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
  type: string; // automatico, electrico, gasolina
  transmission: string; //gasolina dissel etc
  minPrice: number;
  maxPrice: number;
  search: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onApply: () => void;
  onClear: () => void;
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
const type = [...new Set(vehicles.map(v => v.type))];
const brand = [...new Set(vehicles.map(v => v.brand))];

  const toggleValue = (list: string[], value: string) =>
    list.includes(value)
      ? list.filter((v) => v !== value)
      : [...list, value];

  const selectTransmission = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      transmission: prev.transmission === value ? "" : value,
    }));
  };

  const toggleFuel = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      type: prev.type === value ? "" : value,
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
      [key]: isNaN(num) ? 0 : num,
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
                  <Text style={styles.sectionTitle}>Combustible</Text>

                  {type.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.option}
                      onPress={() => toggleFuel(item)}
                    >
                      <Text style={styles.optionText}>
                        {filters.type.includes(item) ? "✔️" : "⬜"} {item}
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