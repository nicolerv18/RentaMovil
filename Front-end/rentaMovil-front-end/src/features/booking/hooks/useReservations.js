    import { useEffect, useState } from "react";
    import {
    getReservations,
    cancelReservation,
    } from "../services/reservationServices.js";
    export const useReservations = () => {
    const [reservas, setReservas] = useState([]);
    const [selectedReserva, setSelectedReserva] = useState(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    useEffect(() => {
        loadReservations();
    }, []);

    const loadReservations = async () => {
        const data = await getReservations();
        setReservas(data);
    };

    const handleCancelReservation = async (id) => {
        await cancelReservation(id);

        setReservas((prev) =>
        prev.map((r) =>
            r.id === id
            ? { ...r, status: "cancelada" }
            : r
        )
        );

        setShowCancelModal(false);
        setSelectedReserva(null);
    };

    return {
        reservas,
        selectedReserva,
        showCancelModal,

        setSelectedReserva,
        setShowCancelModal,

        handleCancelReservation,
    };
    };