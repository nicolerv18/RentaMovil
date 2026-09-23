import type { UUID, ISODateTime } from "./common";

/**
 * Entity: Rental (Aggregate Root).
 * Bounded Context: Rental Execution.
 * Source: 02-domain/entities-and-rules.md.
 *
 * "Physical execution of an already-confirmed reservation: actual pickup, actual return, mileage."
 *
 * NAMING NOTE (requested by the task): "Rent" refers to this same entity — the domain names it
 * `Rental` (Bounded Context "Rental Execution"). Using the documented name here to avoid a
 * duplicate/renamed type for the same concept.
 *
 * `gpsId` references the `GPS` entity (Telemetry & GPS context), which is out of scope for this
 * task (not one of the requested entities) — kept only as a UUID FK.
 */
export type RentalStatus = "IN_PROGRESS" | "COMPLETED";

export type Rental = {
  rentalId: UUID;
  /** FK Reservation, 1:1 — only created from a Reservation in CONFIRMED status (INV-001). */
  reservationId: UUID;
  /** FK GPS — device assigned during the rental. */
  gpsId: UUID;
  actualStartDate: ISODateTime;
  /** Null while the rental is ongoing. */
  actualEndDate?: ISODateTime;
  initialMileage: number;
  /** Null until return. Must be >= initialMileage (INV-002). */
  finalMileage?: number;
  status: RentalStatus;
};
