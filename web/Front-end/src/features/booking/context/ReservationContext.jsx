import {
    createContext,
    useContext,
    useState,
    useMemo,
} from "react";


const ReservationContext =
    createContext(null);


export function ReservationProvider({
    children,
}) {

    const [
        reservation,
        setReservation,
    ] = useState({

        insuranceId: null,
        vehicle: null,
        pickupDate: null,
        returnDate: null,
        pickupBranch: null,

    });


    function updateInsurance(
        insuranceId
    ) {

        setReservation(
            previous => ({

                ...previous,

                insuranceId,

            })
        );

    }

    function updateReservation(data) {
        setReservation(
            previous => ({
                ...previous,
                ...data,
            })
        );
    }

    function clearReservation() {

        setReservation({

            insuranceId: null,
            vehicle: null,
            pickupDate: null,
            returnDate: null,
            pickupBranch: null,

        });

    }

    const contextValue = useMemo(() => ({
        reservation,
        updateInsurance,
        updateReservation,
        clearReservation,
    }), [reservation]);

    return (

        <ReservationContext.Provider
            value={contextValue}
        >

            {children}

        </ReservationContext.Provider>

    );

}


export function useReservation() {

    const context =
        useContext(
            ReservationContext
        );


    if (!context) {

        throw new Error(
            "useReservation debe utilizarse dentro de ReservationProvider"
        );

    }


    return context;

}