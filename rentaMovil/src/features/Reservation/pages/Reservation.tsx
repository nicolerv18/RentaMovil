import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { useReservation } from "../context/ReservationContext";

import ContinueButton from "../components/ContinueButton";
import InsuranceSelector from "../components/InsuranceSelector";
import ReservationInfoCard from "../components/ReservationInfoCard";
import VehicleSummaryCard from "../components/VehicleSummaryCard";
import BranchSelectorModal from "../components/BranchSelectorModal";

import { branches } from "../../branches/data/branches";
import {insurance} from "../../Insurance/data/mocks/insurance";


export default function ReservationPage() {

const {
    reservation,
    updateReturnBranch,
} = useReservation();
const [
    showReturnModal,
    setShowReturnModal
] = useState(false);



if (!reservation?.vehicle) {

    return (

    <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 24
        }}
    >

        <Text>
            No hay una reserva activa en este momento.
        </Text>

    </View>

    );

}


const handleChangePickup = () => {

    router.push("/" as never);

};



const handleChangeReturnBranch = () => {

    setShowReturnModal(true);

};



return (

<ScrollView
    contentContainerStyle={{
        padding:16,
        gap:12
    }}
>


<VehicleSummaryCard
    vehicle={reservation.vehicle}
/>



<ReservationInfoCard

    title="Tu reserva"

    subtitle="Revisa los datos antes de continuar"

    onChangePickup={handleChangePickup}

    onChangeReturnBranch={handleChangeReturnBranch}

/>



<BranchSelectorModal

    visible={showReturnModal}

    branches={branches}

    onClose={()=>{

        setShowReturnModal(false);

    }}

    onSelect={(branch)=>{

        updateReturnBranch(branch);

    }}

/>



<InsuranceSelector
    options={insurance.map((i) => ({
        id: i.id,
        name: i.name,
        description: i.description,
        price:i.price
    }))}
/>



<ContinueButton

    title="Continuar"

    onPress={() =>{
        router.push("/payment")
    }}

/>



</ScrollView>

);

}