import { VEHICLE_STATUS_LABEL } from "../../registerVehicle/constans/vehicleStatus"
export function toInventoryViewModel(vehicle) {
    return {
        id: vehicle.id,
        placa: vehicle.plate,
        marca: vehicle.brand,
        modelo: vehicle.model,
        año: vehicle.year,
        tipo: vehicle.vehicleType,
        sucursal: vehicle.location,
        estado: VEHICLE_STATUS_LABEL[vehicle.status] || vehicle.status,
        km: vehicle.mileage,
        imagen: vehicle.image || null,
    };
    
}