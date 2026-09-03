import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getNotifications,
  markNotificationAsRead,
} from "../services/notificationService.js";
import {
  getNotificationsByType,
  getUnreadNotificationsCount,
} from "../utils/notificationsUtils.js";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [filter, setFilter] = useState("todos");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setNotifications(await getNotifications());
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const openNotification = async (notification) => {
    setSelectedNotification(notification);

    if (notification.is_read) return;

    try {
      await markNotificationAsRead(notification.notification_id);
      const updatedNotification = { ...notification, is_read: true };
      setNotifications((current) =>
        current.map((item) =>
          item.notification_id === notification.notification_id
            ? updatedNotification
            : item
        )
      );
      setSelectedNotification(updatedNotification);
    } catch (updateError) {
      setError(updateError.message);
    }
  };

  const filteredNotifications = useMemo(
    () => getNotificationsByType(notifications, filter),
    [filter, notifications]
  );

  return {
    notifications: filteredNotifications,
    unreadCount: getUnreadNotificationsCount(notifications),
    selectedNotification,
    filter,
    isLoading,
    error,
    setFilter,
    setSelectedNotification,
    openNotification,
    reloadNotifications: loadNotifications,
  };
};
