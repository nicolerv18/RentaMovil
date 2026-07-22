    import carImg from "../../../assets/img/car1.jpg";
import { Vehicle } from "../../../types/vehicles";
import { branches } from "../../branches/data/branches";

    export const vehicles: Vehicle[] = [
    {
        id: 1,

        name: "Mustang GT 500",
        brand: "Ford",
        model: "2022",

        category: "Deportivo",
        transmission: "Automático",
        fuelType: "Gasolina",

        price: 140000,

        image: carImg,

        branch: branches[0],

        seats: 4,
        bags: 2,

        reservations: [],

        benefits: [
        "Kilometraje Ilimitado",
        "Protección Contra Terceros",
        ],
    },

    {
        id: 2,

        name: "Swift Sport",
        brand: "Suzuki",
        model: "2021",

        category: "Hatchback",
        transmission: "Manual",
        fuelType: "Gasolina",

        price: 100000,

        image: carImg,

        branch: branches[1],

        seats: 4,
        bags: 1,

        reservations: [],

        benefits: [
        "Kilometraje Ilimitado",
        "Asistencia en Carretera 24/7",
        "Protección Contra Terceros",
        ],
    },

    {
        id: 3,

        name: "Toyota Prius",
        brand: "Toyota",
        model: "2023",

        category: "Sedán",
        transmission: "Automático",
        fuelType: "Híbrido",

        price: 150000,

        image: carImg,

        branch: branches[2],

        seats: 5,
        bags: 3,

        reservations: [],

        benefits: [
        "Kilometraje Ilimitado",
        "Asistencia en Carretera 24/7",
        "Protección Contra Terceros",
        ],
    },
    ];