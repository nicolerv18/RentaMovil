export const InsuranceTypesMock = [
  {
    id: 1,
    name: "Seguro Básico (First Aid)",
    description:
      "Responsabilidad civil obligatoria frente a terceros (daños corporales y materiales). Asistencia en carretera en horario hábil. No cubre daños propios ni hurto total/parcial.",
    price: 25000,
    tag: "base",
  },
  {
    id: 2,
    name: "Protección Estándar (Standard)",
    description:
      "Cubre daños por colisión con deducible del 10% y protección contra robo parcial o total con franquicia mínima. Incluye asistencia en grúa y auxilio mecánico 24 horas a nivel nacional.",
    price: 45000,
    tag: "popular",
  },
  {
    id: 3,
    name: "Protección Total Todo Riesgo (All-Risk)",
    description:
      "Exención total de responsabilidad por colisión (CDW) y robo (TP) sin deducible. Incluye asistencia médica para ocupantes, remolque ilimitado, cobertura de cristales/llantas y vehículo de sustitución inmediato.",
    price: 90000,
    tag: "premium",
  },
];
