import { useState } from "react";
import { branchService } from "../services/branchService";

export function useDeleteBranch() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function deleteBranch(id) {
        setIsLoading(true);
        setError(null);
        try {
            await branchService.remove(id);
        } catch (err) {
            setError(err.message || "error deleting");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return { deleteBranch, isLoading, error };
}