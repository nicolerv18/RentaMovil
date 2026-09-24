import { useState } from "react";
import { insuranceService } from "../services/insuranceService";

export function useCreateInsurance() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function createInsurance(formData) {
        setIsLoading(true);
        setError(null);
        try {
            return await insuranceService.create(formData);
        } catch (err) {
            setError(err.message || "Error al crear la sucursal");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return { createInsurance, isLoading, error };
}