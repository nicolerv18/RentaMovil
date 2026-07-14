import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

import { DriverData } from "../types/driver";


type PaymentContextType = {

    driver: DriverData | null;

    setDriver: (
        driver: DriverData
    ) => void;

    clearPayment: () => void;

};


export const PaymentContext =
createContext<PaymentContextType | null>(null);



type Props = {

    children: ReactNode;

};



export function PaymentProvider({
    children,
}: Props) {


    const [driver, setDriver] =
        useState<DriverData | null>(null);



    function clearPayment(){

        setDriver(null);

    }



    return (

        <PaymentContext.Provider

            value={{

                driver,

                setDriver,

                clearPayment,

            }}

        >

            {children}

        </PaymentContext.Provider>

    );

}




export function usePayment(){

    const context =
        useContext(PaymentContext);


    if(!context){

        throw new Error(
            "usePayment debe utilizarse dentro de PaymentProvider"
        );

    }


    return context;

}