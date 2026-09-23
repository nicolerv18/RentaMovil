export function toClientVehicleViewModel(vehicle) {
    return {
        id: vehicle.id,
        plate: vehicle.plate,
        brandName: vehicle.brand,
        modelName: vehicle.model,
        name: [vehicle.brand, vehicle.model].filter(Boolean).join(' '),
        categoryName: vehicle.vehicleType,
        engineTypeName: vehicle.fuelType,
        branchName: vehicle.location,
        capacity: vehicle.capacity,
        year: vehicle.year,
        mileage: vehicle.mileage,
        dailyPrice: Number(vehicle.price) || 0,
        status: vehicle.status,
        imageUrl: vehicle.image || null,
    };
}