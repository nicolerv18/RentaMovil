import type { InsuranceType } from "../../../types";

/**
 * Catalogo de planes de seguro.
 *
 * NO esta en la API mock, asi que se resuelve localmente. Los datos se
 * replican del frontend web
 * (`web/Front-end/src/features/admin/insuranceTypes/services/InsuranceTypesMock.js`).
 *
 * El `id` se normaliza a string, como el resto del dominio.
 */
export const insurance: InsuranceType[] = [
  {
    id: "1",
    name: "Seguro Basico (First Aid)",
    description:
      "Responsabilidad civil obligatoria frente a terceros (danios corporales y materiales). Asistencia en carretera en horario habil. No cubre danios propios ni hurto total o parcial.",
    price: 25000,
    tag: "base",
  },
  {
    id: "2",
    name: "Proteccion Estandar (Standard)",
    description:
      "Cubre danos por colision con deducible del 10% y proteccion contra robo parcial o total con franquicia minima. Incluye asistencia en grua y auxilio mecanico 24 horas a nivel nacional.",
    price: 45000,
    tag: "popular",
  },
  {
    id: "3",
    name: "Proteccion Total Todo Riesgo (All-Risk)",
    description:
      "Exencion total de responsabilidad por colision (CDW) y robo (TP) sin deducible. Incluye asistencia medica para ocupantes, remolque ilimitado, cobertura de cristales y llantas y vehiculo de sustitucion inmediato.",
    price: 90000,
    tag: "premium",
  },
];
