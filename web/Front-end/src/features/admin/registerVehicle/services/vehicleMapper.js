export function toVehiclePayload(formData) {
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
        location: formData.location,
        image: formData.image,
        status: 'DISPONIBLE',              
    };
}