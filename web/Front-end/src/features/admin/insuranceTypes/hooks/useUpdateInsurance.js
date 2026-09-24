import { useState } from "react";
import { insuranceService } from "../services/insuranceService";

    export function useUpdateService() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function updateService(id, formData) {
        setIsLoading(true);
        setError(null);
        try {
            await insuranceService.update(id, formData);
        } catch (err) {
            setError(err.message || "Error al actualizar el insurance");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return { updateService, isLoading, error };

}