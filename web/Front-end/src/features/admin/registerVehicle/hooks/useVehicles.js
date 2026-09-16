import { useState, useEffect, useCallback } from 'react';
import { vehicleService } from '../services/vehicleService';

function toVehicleViewModel(vehicle) {
    return {
        ...vehicle,
        brandName: vehicle.brand,
        modelName: vehicle.model,
    };
}

export function useVehicles() {
    const [vehicles, setVehicles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchVehicles = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await vehicleService.getAll();
            setVehicles(data.map(toVehicleViewModel));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchVehicles(); }, [fetchVehicles]);

    return { vehicles, isLoading, error, refetch: fetchVehicles };
}