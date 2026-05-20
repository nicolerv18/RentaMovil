import { vehicles } from "../data/vehicles";

type VehicleFilters = {
  branch?: string;
  type?: string;
  transmission?: string;

  minPrice?: number;
  maxPrice?: number;

  search?: string;
};

const delay = (ms: number) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export const vehicleService = {

  // GET ALL
  async getVehicles(
    filters?: VehicleFilters
  ) {

    // Simula backend
    await delay(500);

    let data = [...vehicles];

    // FILTER BRANCH
    if (filters?.branch) {
      data = data.filter(
        (vehicle) =>
          vehicle.branch === filters.branch
      );
    }

    // FILTER TYPE
    if (filters?.type) {
      data = data.filter(
        (vehicle) =>
          vehicle.type === filters.type
      );
    }

    // FILTER TRANSMISSION
    if (filters?.transmission) {
      data = data.filter(
        (vehicle) =>
          vehicle.transmission ===
          filters.transmission
      );
    }

    // FILTER MIN PRICE
    if (filters?.minPrice !== undefined) {
      data = data.filter(
        (vehicle) =>
          vehicle.price >= filters.minPrice!
      );
    }

    // FILTER MAX PRICE
    if (filters?.maxPrice !== undefined) {
      data = data.filter(
        (vehicle) =>
          vehicle.price <= filters.maxPrice!
      );
    }

    // SEARCH
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

  // GET BY ID
  async getVehicleById(id: number) {

    await delay(300);

    return vehicles.find(
      (vehicle) => vehicle.id === id
    );
  },

  // GET AVAILABLE
  async getAvailableVehicles(
    startDate: Date,
    endDate: Date
  ) {

    await delay(500);

    return vehicles.filter((vehicle) => {

      return !vehicle.reservas.some(
        (reservation) => {

          const reservationStart =
            new Date(reservation.startDate);

          const reservationEnd =
            new Date(reservation.endDate);

          return (
            startDate <= reservationEnd &&
            endDate >= reservationStart
          );
        }
      );
    });
  },
};