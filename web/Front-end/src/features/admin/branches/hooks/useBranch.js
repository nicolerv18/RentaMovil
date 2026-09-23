import { useCallback, useEffect, useState } from "react";
import { branchService } from "../services/branchService";
import { toBranchViewModel } from "../services/branchMapper";

export function useBranches() {
    const [branches, setBranches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBranches = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await branchService.getAll();
            setBranches(response.map(toBranchViewModel));
        } catch (err) {
            setError(err.message || "No se pudieron cargar las sucursales");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => { fetchBranches(); }, [fetchBranches]);

    return { branches, isLoading, error, refetch: fetchBranches };
}