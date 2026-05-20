    import { Vehicle } from "../../../types/vehicles";
    

    export const vehicles: Vehicle[] = [
    {
        id: 1,

        name: "Mustang GT 500",
        brand: "Ford",
        model: "2022",

        type: "Gasolina",

        price: 140000,

        image:
        "https://cdn.imagin.studio/getImage?customer=img&make=ford&modelFamily=mustang",

        branch: "Bogotá",

        seats: 4,
        bags: 2,

        transmission: "Automático",

        reservas: [],
    },

    {
        id: 2,

        name: "Swift Sport",
        brand: "Suzuki",
        model: "2021",

        type: "Deportivo",

        price: 100000,

        image:
        "https://cdn.imagin.studio/getImage?customer=img&make=suzuki&modelFamily=swift",

        branch: "Medellín",

        seats: 4,
        bags: 1,

        transmission: "Manual",

        reservas: [],
    },

    {
        id: 3,

        name: "Toyota Prius",
        brand: "Toyota",
        model: "2023",

        type: "Eléctrico",

        price: 150000,

        image:
        "https://cdn.imagin.studio/getImage?customer=img&make=toyota&modelFamily=prius",

        branch: "Cali",

        seats: 5,
        bags: 3,

        transmission: "Automático",

        reservas: [],
    },
    ];