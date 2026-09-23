import "./Reservation.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useRef } from "react";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import Navbar from "../../../shared/components/layout/Navbar";
import Footer from "../../../shared/components/layout/Footer";
import { branches } from "../../../shared/mocks/branches";
import { useIsMobile } from "../../../shared/hooks/useIsMobile";

import FilterCalendar from "../../vehicles/components/FilterCalendar";
import MapComponent from "../components/MapComponents";
import { useReservationForm } from "../hooks/useReservationForm";
import InsuranceSelector from "../components/InsuranceSelector";
import VehicleReservationCard from "../components/VehicleReservationCard";

import { useReservation } from "../context/ReservationContext";
import { insurance } from "./../data/mocks/insurance";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function Reservation() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const filterCalendarRef = useRef(null);

    const {
        vehicle: rawVehicle,
        img,
        name,
        price,
        branch,
        model,
        type,
        door,
        capacity,
        beneficios,
        rentalSearch,
    } = location.state || {};

    // Identificador real del Vehicle (Reservation.vehicleId, ver
    // types/reservation.ts / types/vehicle.ts). CartVehicule.jsx pasa el
    // objeto `vehicle` completo (mock: vehicle_id) dentro de location.state;
    // sin este id, canCreateReservation en usePaymentForm nunca es true y el
    // botón de pago queda deshabilitado permanentemente.
    const vehicleId =
        rawVehicle?.vehicle_id ??
        rawVehicle?.vehicleId ??
        rawVehicle?.id ??
        null;

    const isMobile = useIsMobile(768);

    const {
        reservation,
        updateReservation,
    } = useReservation();

    const selectedInsurance = insurance.find(
        ({ id }) => id === reservation?.insuranceId
    );

    const {
        selectedBranch,
        setSelectedBranch,
        pickupBranch,
        pickupDate,
        returnDate,
        days,
        total,
        showFilters,
        toggleShowFilters,
    } = useReservationForm(
        price,
        navigate,
        t,
        branch,
        rentalSearch
    );

    const currentCalendarValue = {
        branch: pickupBranch,
        startDate: pickupDate,
        endDate: returnDate,
    };

    /**
     * Guarda toda la información necesaria de la reserva
     * antes de enviar al usuario al módulo de Payment.
     */
    const handlePaymentWithReservation = () => {
        if (!pickupDate || !returnDate) {
            alert(t("reservation.selectDates"));
            return;
        }

        const finalPickupBranch = pickupBranch ?? branch;

        const finalReturnBranch =
            selectedBranch ?? finalPickupBranch;

        updateReservation({
            vehicle: {
                vehicleId,
                img,
                name,
                price,
                branch: finalPickupBranch,
                model,
                type,
                door,
                capacity,
                beneficios,
            },

            pickupBranch: finalPickupBranch,
            returnBranch: finalReturnBranch,

            pickupDate,
            returnDate,
        });

        navigate("/Payment");
    };

    /**
     * Actualiza la búsqueda del calendario
     * y regresa al Home para mostrar los nuevos resultados.
     */
    const handleCalendarChange = (nextState) => {
        const updatedBranch =
            nextState.branch !== undefined
                ? nextState.branch
                : pickupBranch;

        const updatedStartDate =
            nextState.startDate !== undefined
                ? nextState.startDate
                : pickupDate;

        const updatedEndDate =
            nextState.endDate !== undefined
                ? nextState.endDate
                : returnDate;

        navigate("/Home", {
            state: {
                rentalSearch: {
                    branch: updatedBranch,
                    startDate: updatedStartDate,
                    endDate: updatedEndDate,
                },
                triggerSearch: "true",
            },
        });
    };

    if (!name) {
        return <p>No hay vehículo seleccionado</p>;
    }

    return (
        <>
            <Navbar />

            <div className="containerR">

                <div className="calendar-top">

                    {isMobile && (
                        <button
                            type="button"
                            className="filter-toggle"
                            onClick={toggleShowFilters}
                        >
                            {showFilters
                                ? "Ocultar filtros ▲"
                                : "Mostrar filtros ▼"}
                        </button>
                    )}

                    {(!isMobile || showFilters) && (
                        <FilterCalendar
                            ref={filterCalendarRef}
                            onSearch={handleCalendarChange}
                            variant="normal"
                            value={currentCalendarValue}
                            onChange={handleCalendarChange}
                        />
                    )}

                </div>

                <div className="contentR">

                    <div className="leftR">

                        <VehicleReservationCard
                            vehicle={{
                                img,
                                name,
                                price,
                                branch: pickupBranch ?? branch,
                                model,
                                type,
                                door,
                                capacity,
                                beneficios,
                            }}
                        />

                        <div className="card-location">

                            <p className="title-brand">
                                Cambie la sucursal de recogida:
                            </p>

                            <div className="info-location">

                                {/* Sucursal de recogida */}
                                <div className="side-r">

                                    <p className="info-brand">
                                        <FaMapMarkerAlt className="icon-location" />
                                        Sucursal de recogida:
                                    </p>

                                    <div className="card-address-box">

                                        <strong className="branch-name">
                                            {pickupBranch?.name ??
                                                branch?.name ??
                                                "Sucursal"}
                                        </strong>

                                        <p className="branch-street">
                                            {pickupBranch?.address ??
                                                pickupBranch?.direccion ??
                                                branch?.address ??
                                                branch?.direccion ??
                                                "Dirección no disponible"}
                                        </p>

                                    </div>

                                </div>

                                {/* Sucursal de entrega */}
                                <div className="side-left">

                                    <p className="info-brand">
                                        <FaMapMarkerAlt className="icon-location" />
                                        Sucursal de entrega:
                                    </p>

                                    {selectedBranch ? (
                                        <div className="card-address-box">

                                            <strong className="branch-name">
                                                {selectedBranch.name}
                                            </strong>

                                            <p className="branch-street">
                                                {selectedBranch.address ??
                                                    selectedBranch.direccion ??
                                                    "Dirección no disponible"}
                                            </p>

                                        </div>
                                    ) : (
                                        <div className="card-address-box empty">

                                            <p className="branch-street">
                                                Misma sucursal de recogida
                                            </p>

                                        </div>
                                    )}

                                </div>

                            </div>

                            <MapComponent
                                mode="select"
                                branches={branches}
                                selectedBranch={selectedBranch}
                                setSelectedBranch={setSelectedBranch}
                            />

                        </div>

                    </div>

                    {/* Resumen */}
                    <div className="rightR">

                        <div className="card-summary">

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handlePaymentWithReservation();
                                }}
                            >

                                <h3>
                                    {t("reservation.summary")}
                                </h3>

                                <p>
                                    {days} {t("reservation.days")} × ${price}
                                </p>

                                <p>
                                    {selectedInsurance
                                        ? `Seguro: ${selectedInsurance.name} — $${Number(
                                            selectedInsurance.price
                                        ).toLocaleString("es-CO")}`
                                        : t("reservation.sure")}
                                </p>

                                <h4>
                                    {t("reservation.total")} ${total}
                                </h4>

                                <InsuranceSelector
                                    options={insurance}
                                />

                                <button
                                    className="btn-booking"
                                    type="submit"
                                >
                                    {t("reservation.submit")}
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default Reservation;
