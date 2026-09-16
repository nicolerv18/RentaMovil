
export function toCreateMaintenancePayload(formData) {
    return {
        vehicleId: formData.vehicleId,
        plate: formData.plate,
        brand: formData.brand,
        model: formData.model,
        date: formData.date,
        cost: Number(formData.price),
        maintenanceType: formData.maintenanceType,
        observations: formData.observations || '',
        status: 'EN_MANTENIMIENTO',
    };
}