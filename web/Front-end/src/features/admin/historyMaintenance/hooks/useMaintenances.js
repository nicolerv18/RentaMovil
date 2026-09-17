import { useState, useEffect, useCallback } from 'react';
import { maintenanceService } from '../../maintenance/service/maintenanceService';
import { toMaintenanceViewModel } from '../../maintenance/service/maintenanceMapper';

export function useMaintenances() {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRecords = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await maintenanceService.getAll();
            setRecords(data.map(toMaintenanceViewModel));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchRecords(); }, [fetchRecords]);

    return { records, isLoading, error, refetch: fetchRecords };
}