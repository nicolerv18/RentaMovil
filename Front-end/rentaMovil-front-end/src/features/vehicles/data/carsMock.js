export const carsMock = [
  {
    id: 1,
    name: "MustangGT 500",
    pricePerDay: 140000,
    img: "/assets/carts/car1.jpg",
    branch: {
      id: 1,
      name: "Bogotá Centro"
    },
    reservas: [
      {
        startDate: "2026-05-01",
        endDate: "2026-05-05"
      }
    ]
  },
  {
    id: 2,
    name: "Swift 500",
    pricePerDay: 100000,
    img: "/assets/carts/car1.jpg",
    branch: {
      id: 2,
      name: "Aeropuerto Bogotá"
    },
    reservas: []
  }
];