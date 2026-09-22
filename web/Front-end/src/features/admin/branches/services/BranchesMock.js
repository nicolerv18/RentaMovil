export const DAY_IDS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export const createDefaultSchedule = () => [
  { id: "mon", open: "08:00", close: "18:00", closed: false },
  { id: "tue", open: "08:00", close: "18:00", closed: false },
  { id: "wed", open: "08:00", close: "18:00", closed: false },
  { id: "thu", open: "08:00", close: "18:00", closed: false },
  { id: "fri", open: "08:00", close: "18:00", closed: false },
  { id: "sat", open: "08:00", close: "13:00", closed: false },
  { id: "sun", open: "09:00", close: "13:00", closed: true },
];

const standardSchedule = () => [
  { id: "mon", open: "07:00", close: "19:00", closed: false },
  { id: "tue", open: "07:00", close: "19:00", closed: false },
  { id: "wed", open: "07:00", close: "19:00", closed: false },
  { id: "thu", open: "07:00", close: "19:00", closed: false },
  { id: "fri", open: "07:00", close: "19:00", closed: false },
  { id: "sat", open: "08:00", close: "14:00", closed: false },
  { id: "sun", open: "09:00", close: "13:00", closed: true },
];

const roundTheClockSchedule = () =>
  DAY_IDS.map((id) => ({ id, open: "00:00", close: "23:59", closed: false }));

const officeSchedule = () => [
  { id: "mon", open: "08:00", close: "18:00", closed: false },
  { id: "tue", open: "08:00", close: "18:00", closed: false },
  { id: "wed", open: "08:00", close: "18:00", closed: false },
  { id: "thu", open: "08:00", close: "18:00", closed: false },
  { id: "fri", open: "08:00", close: "18:00", closed: false },
  { id: "sat", open: "08:00", close: "13:00", closed: false },
  { id: "sun", open: "09:00", close: "13:00", closed: true },
];

const openingSchedule = () => [
  { id: "mon", open: "08:00", close: "17:00", closed: false },
  { id: "tue", open: "08:00", close: "17:00", closed: false },
  { id: "wed", open: "08:00", close: "17:00", closed: false },
  { id: "thu", open: "08:00", close: "17:00", closed: false },
  { id: "fri", open: "08:00", close: "17:00", closed: false },
  { id: "sat", open: "08:00", close: "13:00", closed: true },
  { id: "sun", open: "09:00", close: "13:00", closed: true },
];

export const BranchesMock = [
  {
    id: 1,
    name: "Sede Bogotá Norte",
    address: "Calle 100 #15-20, Chicó",
    city: "Bogotá",
    phone: "+57 601 234 5678",
    vehiclesAssigned: 18,
    schedule: standardSchedule(),
  },
  {
    id: 2,
    name: "Sede Aeropuerto El Dorado",
    address: "Avenida El Dorado #103-09",
    city: "Bogotá",
    phone: "+57 601 345 6789",
    vehiclesAssigned: 20,
    schedule: roundTheClockSchedule(),
  },
  {
    id: 3,
    name: "Sede Medellín El Poblado",
    address: "Carrera 43A #7-50",
    city: "Medellín",
    phone: "+57 604 456 7890",
    vehiclesAssigned: 10,
    schedule: officeSchedule(),
  },
  {
    id: 4,
    name: "Sede Cali Granada",
    address: "Avenida 9N #14-30",
    city: "Cali",
    phone: "+57 602 555 1234",
    vehiclesAssigned: 0,
    schedule: openingSchedule(),
  },
];
