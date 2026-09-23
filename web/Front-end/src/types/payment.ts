import type { UUID, ISODateTime, Money } from "./common";

/**
 * Entity: Payment (Aggregate Root).
 * Bounded Context: Payment & Billing.
 * Source: 02-domain/entities-and-rules.md.
 *
 * "One payment attempt for a reservation: the customer transfers to a BankAccount and uploads
 * proof; an Admin reviews it before the reservation is confirmed."
 *
 * IMPORTANT: this is a manual bank-transfer flow reviewed by a human Admin — there is NO
 * automated payment gateway (INV-004). Do not add card number / CVV / expiry / transaction-id
 * fields here; they have no equivalent in the domain.
 *
 * `bankAccountId` references `BankAccount` and `reviewedBy` references `User` (Identity &
 * Access) — both out of scope for this task (not one of the requested entities), kept only as
 * UUID FKs.
 */
export type PaymentStatus = "PENDING_REVIEW" | "APPROVED" | "REJECTED";

export type Payment = {
  paymentId: UUID;
  /** FK Reservation. */
  reservationId: UUID;
  /** FK BankAccount — the account the customer transferred to. */
  bankAccountId: UUID;
  /** When the customer registered the transfer. */
  paymentDate: ISODateTime;
  /** Amount claimed by the customer. Must EXACTLY match reservation.totalAmount (INV-001). */
  amount: Money;
  /** Transaction reference as reported by the customer. Optional. */
  referenceNumber?: string;
  /** Required — proof-of-payment file uploaded by the customer (stored in S3/MinIO). */
  receiptFileUrl: string;
  status: PaymentStatus;
  /** FK User — admin who reviewed the receipt. Null while status = PENDING_REVIEW. */
  reviewedBy?: UUID;
  /** Null while status = PENDING_REVIEW. */
  reviewedAt?: ISODateTime;
  /** Set only when status = REJECTED. */
  rejectionReason?: string;
};
