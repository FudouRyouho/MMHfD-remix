import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification, NotificationChannel, NotificationType, updatePermission } from "~/store/NotificationsSlice";
import { RootState } from "~/store/store";

export const useNotifications = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notifications);
  const config = useSelector((state: RootState) => state.config);

  const requestBrowserPermission = useCallback(async () => {
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      dispatch(updatePermission(permission));
      return permission;
    }
    return Notification.permission;
  }, [dispatch]);

  const notify = useCallback(async (
    message: string,
    type: NotificationType,
    options?: {
      icon?: React.ReactNode;
      channel?: NotificationChannel;
      duration?: number;
    }
  ) => {
    const { icon, channel = 'web', duration = 5000 } = options || {};
    const notificationConfig = config.notifications?.global;

    // Notificación web
    if (channel === 'web' || channel === 'both') {
      dispatch(addNotification({ 
        type, 
        message, 
        icon, 
        channel: 'web' 
      }));
    }

    // Notificación del navegador
    if (channel === 'browser' || channel === 'both') {
      const permission = await requestBrowserPermission();
      
      if (permission === 'granted') {
        new Notification('Boss Tracker', {
          body: message,
          icon: '/icon.png',
          silent: !notificationConfig?.sound
        });
      }
    }
  }, [dispatch, config, requestBrowserPermission]);

  return { notify, notifications, requestBrowserPermission };
};