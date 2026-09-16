import { useState } from 'react';
import { maintenanceService } from '../services/maintenanceService';

export function useCreateMaintenance() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function createMaintenance(formData) {
        setIsLoading(true);
        setError(null);
        try {
            return await maintenanceService.create(formData);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return { createMaintenance, isLoading, error };
}