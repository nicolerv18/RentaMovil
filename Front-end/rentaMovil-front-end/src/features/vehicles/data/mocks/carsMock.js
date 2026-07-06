import img from "../../../../assets/carts/car1.jpg";
import { branches } from "./branches";

export const cars = [
  {
    id: 1,
    name: "MustangGT 500",
    price: 140000,
    img: img,
    brand: "Mustang",
    type: "Manual",
    door: 4,
    capacity: 5,
    model: "2022",
    branch: branches[0],
    beneficios: ["Kilometraje Ilimitado", "Proteccion Contra Terceros" ] ,
    reservas: []
  },
  {
    id: 2,
    name: "Swift 500",
    price: 100000,
    img: img,
    brand: "Swift",
    type: "Hibrido",
    door: 4,
    capacity: 5,
    model: "2021",
    branch: branches[2],
    beneficios: ["Kilometraje Ilimitado", "Proteccion Contra Terceros"] ,
    reservas: []
  },
  {
    id: 3,
    name: "Toyota 500",
    price: 150000,
    img: img,
    brand: "Toyota",
    type: "Electrico",
    door: 4,
    capacity: 5,
    model: "2023",
    branch: branches[1],
    beneficios: ["Kilometraje Ilimitado", "Proteccion Contra Terceros", "Contraccion 4x4"] ,
    reservas: []
  },
    {
    id: 4,
    name: "Twingo 500",
    price: 150000,
    img: img,
    brand: "Twingo",
    type: "Manual",
    door: 4,
    capacity: 5,
    model: "2023",
    branch: branches[1],
    beneficios: ["Kilometraje Ilimitado", "Proteccion Contra Terceros"] ,
    reservas: []
  },
      {
    id: 5,
    name: "Twingo",
    price: 120000,
    img: img,
    brand: "Twingo",
    type: "Manual",
    door: 4,
    capacity: 5,
    model: "2021",
    branch: branches[1],
    beneficios: ["Kilometraje Ilimitado", "Proteccion Contra Terceros"] ,
    reservas: []
  },
  {
    id: 6,
    name: "Twingo",
    price: 120000,
    img: img,
    brand: "Twingo",
    type: "Manual",
    door: 4,
    capacity: 5,
    model: "2021",
    branch: branches[1],
    beneficios: ["Kilometraje Ilimitado", "Proteccion Contra Terceros"] ,
    reservas: []
  },
  {
    id: 7,
    name: "Toyota",
    price: 150000,
    img: img,
    brand: "Toyota",
    type: "Electrico",
    door: 4,
    capacity: 5,
    model: "2021",
    branch: branches[2],
    beneficios: ["Kilometraje Ilimitado", "Proteccion Contra Terceros"] ,
    reservas: []

  }
];