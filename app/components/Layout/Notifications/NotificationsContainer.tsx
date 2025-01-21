import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import { removeNotification, addNotification } from '~/store/NotificationsSlice';
import NotificationPush from './NotificationPush';

const NotificationsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notifications.notifications);

  const handleRemoveNotification = (id: string) => {
    dispatch(removeNotification(id));
  };

  const handleAddNotification = () => {
    dispatch(addNotification({ type: 'success', message: 'Notificación agregada correctamente' }));
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end space-y-4">
      {notifications.map((notification) => (
        <NotificationPush
          key={notification.id}
          type={notification.type}
          message={notification.message}
          icon={notification.icon}
          onClose={() => handleRemoveNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationsContainer;
