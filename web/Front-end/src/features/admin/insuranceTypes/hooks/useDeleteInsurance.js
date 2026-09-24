import { useState } from "react";
import { insuranceService } from "../services/insuranceService";

export function useDeleteInsurance() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function deleteInsurance(id) {
        setIsLoading(true);
        setError(null);
        try {
            await insuranceService.remove(id);
        } catch (err) {
            setError(err.message || "error deleting");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return { deleteInsurance, isLoading, error };
}