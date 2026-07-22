import { vehicles } from "../data/vehicles";
import {Branch} from "../../../types/branch";

type VehicleFilters = {
  brand?: string;
  branch?: Branch;
  category?: string;
  transmission?: string;
  fuelType?: string;

  minPrice?: number;
  maxPrice?: number;

  search?: string;
  startDate?: Date;
  endDate?: Date;
};

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const vehicleService = {

  async getVehicles(filters?: VehicleFilters) {

    await delay(500);

    let data = [...vehicles];

    // Sucursal
    if (filters?.branch) {
      const selectedBranchId = filters.branch.id;
      data = data.filter(
        (vehicle) => vehicle.branch.id === selectedBranchId
      );
    }

    // Categoría
    if (filters?.category) {
      data = data.filter(
        (vehicle) =>
          vehicle.category === filters.category
      );
    }

    // Marca
    if (filters?.brand) {
      data = data.filter(
        (vehicle) =>
          vehicle.brand === filters.brand
      );
    }

    // Transmisión
    if (filters?.transmission) {
      data = data.filter(
        (vehicle) =>
          vehicle.transmission ===
          filters.transmission
      );
    }

    // Precio mínimo
    if (filters?.minPrice !== undefined) {
      const minPrice = filters.minPrice;
      data = data.filter(
        (vehicle) =>
          vehicle.price >= minPrice
      );
    }

    // Precio máximo
    if (filters?.maxPrice !== undefined) {
      const maxPrice = filters.maxPrice;
      data = data.filter(
        (vehicle) =>
          vehicle.price <= maxPrice
      );
    }

    // Búsqueda
    if (filters?.search) {

      const query =
        filters.search.toLowerCase();

      data = data.filter((vehicle) =>
        vehicle.name
          .toLowerCase()
          .includes(query)
      );
    }

    return data;
  },

  async getVehicleById(id: number) {

    await delay(300);

    return vehicles.find(
      (vehicle) => vehicle.id === id
    );
  },

  async getAvailableVehicles(
    startDate: Date,
    endDate: Date
  ) {

    await delay(500);

    return vehicles.filter((vehicle) => {

      return !vehicle.reservations.some(
        (reservation) => {

          return (
            startDate <= reservation.endDate &&
            endDate >= reservation.startDate
          );
        }
      );

    });
  },

};