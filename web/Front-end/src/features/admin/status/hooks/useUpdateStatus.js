import { useState } from "react";
import { statusService } from "../services/statusService";

export function useUpdateStatus(){
    const [ isLoading, setIsLoading] = useState(false)
    const [ error, setError] = useState(null)

    async function updateStatusVehicle(id, formData){
        setIsLoading(true)
        setError(null)
        try{
            await statusService.update(id,formData)
        } catch (err) {
            setError(err.message || "error updating")
            throw err;
        } finally {
            setIsLoading(false)
        }
    }

    return {updateStatusVehicle, isLoading, error}

}