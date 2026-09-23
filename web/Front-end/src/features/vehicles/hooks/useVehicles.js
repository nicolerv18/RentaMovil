import { useCallback,useEffect,useState } from "react";
import { carsService } from "../Services/carsService";
import { toClientVehicleViewModel } from "../Services/carsMapper";

export function useCars(){
    const [isLoading,setIsLoading ] = useState(false)
    const [error, setError] = useState(null)
    const [cars, setCars] = useState([])

    const fetchVehicle = useCallback( async () => {
        setIsLoading(true)
        setError(null)

        try{
            const response = await carsService.getAll()
            setCars(response.map(toClientVehicleViewModel))
        }catch (err){
            setError(err.message || "no se pueden cargar los carritos")
        } finally{
            setIsLoading(false)
        }
    },[])
    useEffect(() => {fetchVehicle()},[fetchVehicle])
    return {cars,isLoading,error,refetch:fetchVehicle}
}