import img from "../../../assets/carts/car1.jpg";
import { branches } from "./branches.js";

export const cars = [
  {
    id: 1,
    name: "MustangGT 500",
    price: 140000,
    img: img,
    brand: "Mustang",
    type: "Gasolina",
    model: "2022",
    branch: branches[0],
    reservas: []
  },
  {
    id: 2,
    name: "Swift 500",
    price: 100000,
    img: img,
    brand: "Swift",
    type: "Deportivo",
    model: "2021",
    branch: branches[2],
    reservas: []
  },
  {
    id: 3,
    name: "Toyota 500",
    price: 150000,
    img: img,
    brand: "Toyota",
    type: "Electrico",
    model: "2023",
    branch: branches[1],
    reservas: []
  },
    {
    id: 4,
    name: "Twingo 500",
    price: 150000,
    img: img,
    brand: "Twingo",
    type: "Gasolina",
    model: "2023",
    branch: branches[1],
    reservas: []
  },
];