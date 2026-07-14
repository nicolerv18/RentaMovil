import { ScrollView } from "react-native";
import VehiclePaymentCard from "../components/VehiclePaymentCard"
import DriverInfoCard from "../components/DriverInfoCard";
import InvoiceCard from "../components/InvoiceCard";
export default function PaymentPage(){
    return(
    <ScrollView>
        <VehiclePaymentCard/>
        <DriverInfoCard/>
        <InvoiceCard/>
    </ScrollView>
    );
}