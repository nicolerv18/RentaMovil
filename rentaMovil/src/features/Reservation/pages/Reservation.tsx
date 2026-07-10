import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Vehicle } from "../../../types/vehicles";
import { vehicleService } from "../../vehicles/services/vehicleService";
import VehicleSummaryCard from "../components/VehicleSummaryCard";

export default function ReservationPage() {
    const {vehicleId} = useLocalSearchParams();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const loadVehicle = async () => {

    const data =
        await vehicleService.getVehicleById(
            Number(vehicleId)
        );

    if (data) {
        setVehicle(data);
    }

};
useEffect(() => {
    loadVehicle();
}, []);
if (!vehicle) {
    return (
        <View>
            <Text>Cargando vehículo...</Text>
        </View>
    );
}
return (
    <ScrollView>
        <VehicleSummaryCard vehicle={vehicle} />
    </ScrollView>
);
}