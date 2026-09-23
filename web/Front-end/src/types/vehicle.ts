import type { UUID } from "./common";
import type { Money } from "./common";

/**
 * Entity: Vehicle (Aggregate Root).
 * Bounded Context: Fleet & Maintenance.
 * Source: 02-domain/entities-and-rules.md.
 *
 * "Physical fleet unit that can be reserved and rented."
 *
 * IMPORTANT — no `RESERVED` status: a single vehicle-wide status can't represent "booked for
 * specific future dates but free the rest of the month". Whether a vehicle is bookable for a
 * given date range is computed by checking for overlapping `Reservation` rows against
 * `vehicleId`, NOT by reading `status`. `status` only tracks the two states that are truly
 * global and date-independent right now: `RENTED` or `MAINTENANCE`.
 *
 * NOTE: `category` and `engineType` are attributes of the vehicle's *model*, not of each
 * physical unit — they are read through `modelId` (`VehicleModel`), never duplicated here.
 * `VehicleModel`/`Brand`/`Category`/`EngineType` are catalog entities out of scope for this task
 * (not one of the requested entities) — referenced only by `modelId`.
 */
export type VehicleStatus = "AVAILABLE" | "RENTED" | "MAINTENANCE";

export type Vehicle = {
  vehicleId: UUID;
  /** Unique license plate. */
  plate: string;
  /** FK VehicleModel — category and engine type are read through it, not stored here. */
  modelId: UUID;
  /** Passenger capacity. Must be > 0. */
  capacity: number;
  year: number;
  imageUrl?: string;
  status: VehicleStatus;
  /** Current mileage. Must be >= 0 and can never decrease (INV-004). */
  mileage: number;
  /** Price per day. Must be > 0 (INV-001). */
  dailyPrice: Money;
  /** FK Branch — branch where the vehicle is currently located. */
  branchId: UUID;
};
