import type { UUID } from "./common";

/**
 * Entity: BankAccount.
 * Bounded Context: Payment & Billing (catalog, SUPER_ADMIN-managed — not an Aggregate Root).
 * Source: 02-domain/entities-and-rules.md.
 *
 * "A company bank account, shown to the customer as a QR code to transfer to. Configured
 * exclusively by SUPER_ADMIN — replaces the earlier generic payment-method catalog now that
 * payment is a manual bank-transfer flow, not a card/PSE gateway."
 *
 * INV-001: only a user with role SUPER_ADMIN can create, update, or deactivate a BankAccount.
 * INV-002: a customer can only select an ACTIVE (isActive = true) BankAccount at checkout.
 */
export type BankAccount = {
  bankAccountId: UUID;
  /** e.g. "Bancolombia", "Nequi". */
  bankName: string;
  /** Account holder name (the company). */
  accountHolder: string;
  /** QR image shown to the customer at checkout; stored in file storage (S3/MinIO). */
  qrImageUrl: string;
  /** Inactive accounts are hidden from checkout but keep their payment history (INV-002). */
  isActive: boolean;
};
