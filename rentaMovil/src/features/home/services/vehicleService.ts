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

  async getVehicles(
    filters?: VehicleFilters
  ) {

    await delay(500);

    let data = [...vehicles];

    if (filters?.branch) {
      data = data.filter(
        (vehicle) =>
          vehicle.branch === filters.branch
      );
    }

    if (filters?.type) {
      data = data.filter(
        (vehicle) =>
          vehicle.type === filters.type
      );
    }

    if (filters?.transmission) {
      data = data.filter(
        (vehicle) =>
          vehicle.transmission ===
          filters.transmission
      );
    }

    if (filters?.minPrice !== undefined) {
      data = data.filter(
        (vehicle) =>
          vehicle.price >= filters.minPrice!
      );
    }

    if (filters?.maxPrice !== undefined) {
      data = data.filter(
        (vehicle) =>
          vehicle.price <= filters.maxPrice!
      );
    }

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