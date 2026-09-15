    import img from "../../../../assets/carts/car1.jpg";

    export const reservationsMock = [
    {
        id: 1,
        status: "activa",
        start_date: "2026-05-01",
        end_date: "2026-05-05",
        days: 4,
        total_price: 400000,
        vehicle: {
        brand: "Toyota",
        model: "Corolla",
        img,
        },
    },
    {
        id: 2,
        status: "cancelada",
        start_date: "2026-04-20",
        end_date: "2026-04-22",
        days: 2,
        total_price: 200000,
        vehicle: {
        brand: "Mazda",
        model: "CX-5",
        img,
        },
    },
    {
        id: 3,
        status: "pagada",
        start_date: "2026-04-10",
        end_date: "2026-04-15",
        days: 5,
        total_price: 500000,
        vehicle: {
        brand: "Kia",
        model: "Rio",
        img,
        },
    },
    ];