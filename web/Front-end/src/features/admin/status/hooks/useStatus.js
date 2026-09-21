import { useCallback, useEffect, useState } from "react";
import { statusService } from "../services/statusService";
import { toStatusViewModel } from "../services/statusMapper";

export function useStatus(){
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [ vehicles, setVehicles] = useState([])

    const fetchVehicle = useCallback( async () => {
        setIsLoading(true)
        setError(null)
        try{
            const response = await statusService.getAll()
            setVehicles(response.map(toStatusViewModel))
        }catch (err){
            setError(err.message || "error al mostrar")
        }finally {
            setIsLoading(false)
        }
    },[])
        useEffect(() => {fetchVehicle()},[fetchVehicle])
        return {vehicles,isLoading,error,refetch: fetchVehicle};
}