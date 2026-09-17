import { useState } from 'react';
import { maintenanceService } from '../../maintenance/service/maintenanceService';

export function useDeleteMaintenance() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function deleteMaintenance(id) {
        setIsLoading(true);
        setError(null);
        try {
            await maintenanceService.remove(id);
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return { deleteMaintenance, isLoading, error };
}