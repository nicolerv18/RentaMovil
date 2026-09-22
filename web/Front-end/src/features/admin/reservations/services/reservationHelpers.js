export const STATUS_ORDER = ["PENDING_REVIEW", "PENDING_PAYMENT", "CONFIRMED", "COMPLETED", "CANCELLED"];

export function getTotal(r) {
  return r.rentalSubtotal + r.insurance.amount;
}

// Reservation.status only has 5 values in the domain model — CONFIRMED covers both
// "not picked up yet" and "vehicle out with the customer". This derives a friendlier
// display-only status so admins can tell the two apart at a glance.
export function getDisplayStatus(r) {
  if (r.status === "CONFIRMED" && r.rental?.status === "IN_PROGRESS") return "IN_PROGRESS";
  return r.status;
}

export function statusMeta(status, t) {
  return {
    PENDING_REVIEW: { label: t("reservations.status.pendingReview"), className: "amber" },
    PENDING_PAYMENT: { label: t("reservations.status.pendingPayment"), className: "yellow" },
    CONFIRMED: { label: t("reservations.status.confirmed"), className: "emerald" },
    IN_PROGRESS: { label: t("reservations.status.inProgress"), className: "purple" },
    COMPLETED: { label: t("reservations.status.completed"), className: "blue" },
    CANCELLED: { label: t("reservations.status.cancelled"), className: "slate" },
  }[status];
}

export function formatDate(iso, lang) {
  return new Date(iso).toLocaleDateString(lang, { day: "numeric", month: "short", year: "numeric" });
}

export function formatTime(iso, lang) {
  return new Date(iso).toLocaleTimeString(lang, { hour: "numeric", minute: "2-digit", hour12: true });
}

export function formatMoney(n) {
  return `$ ${n.toLocaleString("es-CO")} COP`;
}
