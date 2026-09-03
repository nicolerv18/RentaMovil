export const NOTIFICATION_TYPES = [
  "reserva_confirmada",
  "pago_confirmado",
  "reserva_cancelada",
  "recordatorio",
];

export const getNotificationsByType = (notifications, type) =>
  type === "todos"
    ? notifications
    : notifications.filter((notification) => notification.type === type);

export const getUnreadNotificationsCount = (notifications) =>
  notifications.filter((notification) => !notification.is_read).length;

export const getNotificationStatus = (type) => {
  const statuses = {
    reserva_confirmada: "Activa",
    pago_confirmado: "Pago confirmado",
    reserva_cancelada: "Cancelada",
    recordatorio: "Pendiente",
  };

  return statuses[type] ?? "Sin estado";
};

export const attachVehicleToNotifications = (notifications, vehicles) => {
  const vehiclesById = new Map(vehicles.map((vehicle) => [vehicle.id, vehicle]));

  return notifications.map((notification) => ({
    ...notification,
    vehicle: vehiclesById.get(notification.vehicle_id) ?? null,
  }));
};
