import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { removeNotification, addNotification, updatePermission } from '~/store/NotificationsSlice';
import NotificationPush from './NotificationPush';

const NotificationsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state: RootState) => state.notifications);
  const config = useSelector((state: RootState) => state.config);

  // Solicitar permisos al montar el componente si es necesario
  useEffect(() => {
    if (config.notifications?.global?.channel !== 'web') {
      Notification.requestPermission().then(permission => {
        dispatch(updatePermission(permission));
      });
    }
  }, [dispatch, config]);

  const handleRemoveNotification = (id: string) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-4">
      {notifications.map((notification) => (
        notification.channel === 'web' && (
          <NotificationPush
            key={notification.id}
            type={notification.type}
            message={notification.message}
            icon={notification.icon}
            onClose={() => handleRemoveNotification(notification.id)}
          />
        )
      ))}
    </div>
  );
};

export default NotificationsContainer;
