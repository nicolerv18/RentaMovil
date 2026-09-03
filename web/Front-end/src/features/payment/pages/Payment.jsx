import React from "react";

// Componentes Web del proyecto
import VehicleReservationCard from "../../booking/components/VehicleReservationCard";
import DriverInfoCard from "../components/DriverInfoCard";
import Navbar from "../../../shared/components/layout/Navbar";
import InvoiceCard from "../components/InvoiceCard";
import Footer from "../../../shared/components/layout/Footer";
import PaymentMethodSelector from "../components/PaymentMethoSelector";
import ContinueButton from "../../../shared/components/continueButton";

// Hooks de lógica de negocio
import { usePaymentForm } from "../hooks/usePaymentForm";
import { usePayment } from "../context/PaymentContext";
import { useReservation } from "../../booking/context/ReservationContext";

export default function PaymentPage() {
    
    const { reservation } = useReservation();
    const {
        canReserve,
        isProcessing,
        handlePayment,
        selectedPaymentMethod,
        days,
        total
    } = usePaymentForm();

    const { setSelectedPaymentMethod } = usePayment();
    
    if (!reservation?.vehicle) {
        return <p>No hay reserva disponible</p>;
    }

    return (
        <>
            <Navbar />
            
            <div style={{ paddingBottom: "40px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
                
                <VehicleReservationCard vehicle={reservation.vehicle} />
                <DriverInfoCard />
            
                <InvoiceCard days={days} total={total} vehicle={reservation.vehicle} />
                
                <PaymentMethodSelector
                    selectedMethod={selectedPaymentMethod}
                    onSelect={setSelectedPaymentMethod}
                />

                {isProcessing ? (
                    <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
                        <div className="spinner-web">Cargando...</div>
                    </div>
                ) : (
                    <ContinueButton
                        title="Reservar"
                        onPress={handlePayment}
                        disabled={!canReserve}
                    />
                )}
            </div>
            <Footer/>
        </>
    );
}
