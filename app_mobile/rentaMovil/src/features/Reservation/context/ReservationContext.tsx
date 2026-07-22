    import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

    import { Branch } from "../../../types/branch";
import { Vehicle } from "../../../types/vehicles";
import { ReservationDraft } from "../types/reservastion";

    type ReservationContextType = {

    reservation: ReservationDraft | null;

    createReservation: (
        vehicle: Vehicle,
        pickupBranch: Branch,
        returnBranch: Branch,
        pickupDate: Date,
        returnDate: Date
    ) => void;

    updatePickupBranch: (branch: Branch) => void;

    updateReturnBranch: (branch: Branch) => void;

    updateInsurance: (
        insuranceId: number | null
    ) => void;

    clearReservation: () => void;
    };

    const ReservationContext =
    createContext<ReservationContextType | null>(
        null
    );

    type Props = {
    children: ReactNode;
    };

    export function ReservationProvider({
    children,
    }: Props) {

    const [reservation, setReservation] =
        useState<ReservationDraft | null>(null);

    function createReservation(
        vehicle: Vehicle,
        pickupBranch: Branch,
        returnBranch: Branch,
        pickupDate: Date,
        returnDate: Date
    ) {

        setReservation({

        vehicle,

        pickupBranch,

        returnBranch,

        pickupDate,

        returnDate,

        insuranceId: null,

        });

    }

    function updatePickupBranch(
        branch: Branch
    ) {

        if (!reservation) return;

        setReservation({

        ...reservation,

        pickupBranch: branch,

        });

    }

    function updateReturnBranch(
        branch: Branch
    ) {

        if (!reservation) return;

        setReservation({

        ...reservation,

        returnBranch: branch,

        });

    }

    function updateInsurance(
        insuranceId: number | null
    ) {

        if (!reservation) return;

        setReservation({

        ...reservation,

        insuranceId,

        });

    }

    function clearReservation() {

        setReservation(null);

    }

    return (

        <ReservationContext.Provider

        value={{

            reservation,

            createReservation,

            updatePickupBranch,

            updateReturnBranch,

            updateInsurance,

            clearReservation,

        }}

        >

        {children}

        </ReservationContext.Provider>

    );

    }

    export function useReservation() {

    const context =
        useContext(ReservationContext);

    if (!context) {

        throw new Error(
        "useReservation debe utilizarse dentro de ReservationProvider"
        );

    }

    return context;

    }