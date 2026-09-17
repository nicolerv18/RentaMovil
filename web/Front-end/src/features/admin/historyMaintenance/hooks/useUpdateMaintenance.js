import { useState } from 'react';
import { maintenanceService } from '../../maintenance/service/maintenanceService';

export function useUpdateMaintenance() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function updateMaintenance(id, formData) {
        setIsLoading(true);
        setError(null);
        try {
            return await maintenanceService.update(id, formData);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return { updateMaintenance, isLoading, error };
}