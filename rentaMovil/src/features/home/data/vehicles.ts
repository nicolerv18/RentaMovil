import { Vehicle } from "../../../types/vehicles";
import { branches } from "./branches";
import carImg from "../../../assets/img/car1.jpg";
    

    export const vehicles: Vehicle[] = [
    {
        id: 1,

        name: "Mustang GT 500",
        brand: "Ford",
        model: "2022",

        type: "automatico",

        price: 140000,

        image: carImg,

        branch: branches[0],

        seats: 4,
        bags: 2,

        transmission: "Gasolina",

        reservas: [],

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

        type: "Deportivo",

        price: 100000,

        image: carImg,

        branch: branches[1],

        seats: 4,
        bags: 1,

        transmission: "Manual",

        reservas: [],

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

        type: "Eléctrico",

        price: 150000,

        image: carImg,

        branch: branches[2],

        seats: 5,
        bags: 3,

        transmission: "Automático",

        reservas: [],

        benefits: [
        "Kilometraje Ilimitado",
        "Asistencia en Carretera 24/7",
        "Protección Contra Terceros",
        ],
    },
    ];