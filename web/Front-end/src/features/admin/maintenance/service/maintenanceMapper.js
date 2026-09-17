import { MAINTENANCE_STATUS } from '../constans/maintenanceStatus';

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
        image: formData.image || '',
        status: MAINTENANCE_STATUS.PENDING,
    };
}

export function toUpdateMaintenancePayload(formData) {
    return {
        model: formData.model,
        maintenanceType: formData.maintenanceType,
        date: formData.date,
        observations: formData.observations || '',
        status: formData.status,
    };
}

export function toMaintenanceViewModel(record) {
    return {
        ...record,
        brandName: record.brand,
        modelName: record.model,
        typeMaintenance: record.maintenanceType,
        description: record.observations,
    };
}