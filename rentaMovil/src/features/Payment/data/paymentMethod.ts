import { PaymentMethod } from "../types/payment";


export const paymentMethods: PaymentMethod[] = [

{
    id:1,
    name:"Tarjeta débito/crédito",
    description:"Pago seguro con tarjeta",
    enabled:true
},

{
    id:2,
    name:"PSE",
    description:"Pago desde tu banco",
    enabled:true
},

{
    id:3,
    name:"Efectivo",
    description:"Pago al recoger el vehículo",
    enabled:false
}

];