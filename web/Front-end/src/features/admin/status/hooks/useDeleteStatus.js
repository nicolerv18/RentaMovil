import { useState } from "react";
import { statusService } from "../services/statusService";

export function useDeleteStatus() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function deleteStatusVehicle(id) {
        setIsLoading(true);
        setError(null);
        try {
            await statusService.remove(id);
        } catch (err) {
            setError(err.message || "error deleting");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return { deleteStatusVehicle, isLoading, error };
}