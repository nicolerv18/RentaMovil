import { useState } from "react";
import { branchService } from "../services/branchService";

export function useCreateBranch() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function createBranch(formData) {
        setIsLoading(true);
        setError(null);
        try {
            return await branchService.create(formData);
        } catch (err) {
            setError(err.message || "Error al crear la sucursal");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return { createBranch, isLoading, error };
}