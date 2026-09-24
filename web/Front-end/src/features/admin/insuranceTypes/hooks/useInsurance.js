import { useCallback, useEffect, useState } from "react";
import { insuranceService } from "../services/insuranceService";
import { toInsuranceViewModel } from "../services/insuranceMapper"; 

export function useInsurance(){
    const [insurance, setInsurance] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)


    const fetchInsurance = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await insuranceService.getAll();
            setInsurance(response.map(toInsuranceViewModel))
        }catch (err){
            setError(err.message || "no se peuden mostrar los contratos")
        }finally{
            setIsLoading(false)
        }
    }, [])
    useEffect(() => {fetchInsurance();}, [fetchInsurance])

    return {insurance,isLoading,error, refetch: fetchInsurance}
}