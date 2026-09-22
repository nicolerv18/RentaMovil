import type { UUID } from "./common";

/**
 * Entity: Branch.
 * Bounded Context: Fleet & Maintenance.
 * Source: 02-domain/entities-and-rules.md.
 *
 * "Physical branch where pickups and returns are managed."
 *
 * NOTE: the domain explicitly rejected a free-text `schedules` field — operating hours are a
 * separate entity (`BranchOperatingHour`, one row per day of week), not an attribute of Branch.
 * `BranchOperatingHour` is out of scope for this task (not one of the requested entities) and is
 * not modeled here.
 */
export type Branch = {
  branchId: UUID;
  name: string;
  address: string;
  city: string;
  /** Optional per the domain. */
  phone?: string;
};
