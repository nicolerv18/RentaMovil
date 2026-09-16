import { useState } from "react";   
import { vehicleService } from "../services/vehicleService";

export function useCreateVehicle() {
    const [isloading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    async function createVehicle(vehicleData) {
        setLoading(true);
        setError(null);
        try {
            const response = await vehicleService.create(vehicleData);
            return response;
        } catch (err) {
            setError(err.message || "Error al crear el vehículo");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return {createVehicle, isloading, error};
}
