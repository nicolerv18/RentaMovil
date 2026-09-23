import { useState } from "react";
import { branchService } from "../services/branchService";

export function useUpdateBranch() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function updateBranch(id, formData) {
        setIsLoading(true);
        setError(null);
        try {
            await branchService.update(id, formData);
        } catch (err) {
            setError(err.message || "Error al actualizar la sucursal");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return { updateBranch, isLoading, error };
}