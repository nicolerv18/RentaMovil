// Barrel file — re-exports every domain type in this folder.
// One file per Entity defined in 02-domain/entities-and-rules.md. Original scope:
// Vehicle, InsuranceType, Branch, Reservation, Rental, Payment, Notification.
// BankAccount added later to type the temporary bank mocks used at checkout.

export * from "./common";
export * from "./branch";
export * from "./vehicle";
export * from "./insuranceType";
export * from "./reservation";
export * from "./rental";
export * from "./payment";
export * from "./notification";
export * from "./bankAccount";
