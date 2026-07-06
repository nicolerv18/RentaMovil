import { Vehicle } from "../../../types/vehicles";
import { branches } from "./branches";
import carImg from "../../../assets/img/car1.jpg";
    

    export const vehicles: Vehicle[] = [
    {
        id: 1,

        name: "Mustang GT 500",
        brand: "Ford",
        model: "2022",

        category: "Deportivo",

        price: 140000,

        image: carImg,

        branch: branches[0],

        seats: 4,
        bags: 2,

        transmission: "Automático",
        fuelType: "Gasolina",

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

        price: 100000,

        image: carImg,

        branch: branches[1],

        seats: 4,
        bags: 1,

        transmission: "Manual",
        fuelType: "Gasolina",

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

        price: 150000,

        image: carImg,

        branch: branches[2],

        seats: 5,
        bags: 3,

        transmission: "Automático",
        fuelType: "Híbrido",

        reservations: [],

        benefits: [
        "Kilometraje Ilimitado",
        "Asistencia en Carretera 24/7",
        "Protección Contra Terceros",
        ],
    },
    ];