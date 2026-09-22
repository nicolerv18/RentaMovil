import type { UUID } from "./common";
import type { Money } from "./common";

/**
 * Entity: InsuranceType.
 * Bounded Context: Booking & Reservation (simple catalog, not an Aggregate Root).
 * Source: 02-domain/entities-and-rules.md.
 *
 * "Available insurance plan." Per 01-context/glossary.md there are exactly 3 today: First Aid,
 * Standard, All-Risk. The domain doc types `name` as `string` (not a closed enum column), so it
 * is kept as `string` here — the 3 current values are documented as a business fact, not encoded
 * as a TS union, to avoid inventing a stricter constraint than the domain actually declares.
 */
export type InsuranceType = {
  insuranceTypeId: UUID;
  /** Plan name — currently one of "First Aid", "Standard", "All-Risk". */
  name: string;
  coverageDetails: string;
  /** Cost per day. Must be > 0. */
  dailyCost: Money;
};
