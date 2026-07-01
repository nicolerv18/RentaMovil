export const buildVehicleFilters = (filters: Filters): VehicleFilters => {
  return {
    transmission:
      filters.transmission.length > 0
        ? filters.transmission.join(",")
        : undefined,

    fuel:
      filters.fuel.length > 0
        ? filters.fuel.join(",")
        : undefined,

    minPrice: filters.minPrice || undefined,
    maxPrice: filters.maxPrice || undefined,
  };
};