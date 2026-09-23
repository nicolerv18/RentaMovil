export function toVehiclePayload(formData) {
    return {
        id: formData.plate.toUpperCase(),
        plate: formData.plate,
        brand: formData.brand,
        model: formData.model,
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        year: Number(formData.age),        
        capacity: Number(formData.capacity),
        vehicleType: formData.vehicleType,
        fuelType: formData.fuelType,
        branchId: formData.branchId,   
        image: formData.image,
        status: 'Disponible',              
    };
}export function toCreatePayload(formData) {
    return {
        id: formData.plate.toUpperCase(),
        plate: formData.plate.toUpperCase(),
        brand: formData.brand,
        model: formData.model,
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        year: Number(formData.age),
        capacity: Number(formData.capacity),
        vehicleType: formData.vehicleType,
        fuelType: formData.fuelType,
        branchId: formData.branchId,      // antes: location: formData.location
        image: formData.image,
        status: VEHICLE_STATUS.AVAILABLE,
    };
}

export function toUpdatePayload(formData) {
    return {
        plate: formData.plate,
        brand: formData.brand,
        model: formData.model,
        price: Number(formData.price),
        mileage: Number(formData.mileage),
        year: Number(formData.age),
        capacity: Number(formData.capacity),
        vehicleType: formData.vehicleType,
        fuelType: formData.fuelType,
        branchId: formData.branchId,
        image: formData.image,
    };
}