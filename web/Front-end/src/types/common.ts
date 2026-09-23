// Shared primitives and Value Objects used across every entity type in this folder.
// Source: 02-domain/entities-and-rules.md — section "System Value Objects".

/** All entity identifiers in the domain are UUIDs. */
export type UUID = string;

/** All datetime attributes in the domain are ISO 8601 strings (e.g. domain-events.md payloads). */
export type ISODateTime = string;

/**
 * Value Object: Money.
 * Used in Vehicle.daily_price, InsuranceType.daily_cost, Reservation's subtotals/total,
 * Payment.amount, VehicleMaintenance.cost.
 * Validation rules (domain): amount must be >= 0; no arithmetic between different currencies.
 */
export type Money = {
  amount: number;
  currency: string;
};
