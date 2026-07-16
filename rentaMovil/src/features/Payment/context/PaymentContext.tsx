import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

import { DriverData } from "../types/driver";
import { PaymentMethod } from "../types/payment";


type PaymentContextType = {

    driver: DriverData | null;

    setDriver: (
        driver: DriverData
    ) => void;


    selectedPaymentMethod: PaymentMethod | null;

    setSelectedPaymentMethod: (
        method: PaymentMethod | null
    ) => void;


    clearPayment: () => void;

};


const PaymentContext =
createContext<PaymentContextType | null>(null);



type Props = {
    children: ReactNode;
};



export function PaymentProvider({
children,
}: Props){


const [driver,setDriver] =
useState<DriverData | null>(null);



const [
    selectedPaymentMethod,
    setSelectedPaymentMethod
] =
useState<PaymentMethod | null>(null);



function clearPayment(){

    setDriver(null);

    setSelectedPaymentMethod(null);

}



return(

<PaymentContext.Provider

value={{

    driver,

    setDriver,

    selectedPaymentMethod,

    setSelectedPaymentMethod,

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