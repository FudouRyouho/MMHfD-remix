import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationType = 'success' | 'error' | 'warning' | 'info'
export type NotificationChannel = 'web' | 'browser' | 'both'

export interface NotificationConfig {
  enabled: boolean;
  channel: NotificationChannel;
  duration?: number;
  sound?: boolean;
  grouping?: boolean;
}
export interface NotificationData {
  id: string;
  type: NotificationType;
  message: string;
  icon?: React.ReactNode;
  channel?: NotificationChannel;
}
interface NotificationsState {
  notifications: NotificationData[];
  permission: NotificationPermission;
}

const initialState: NotificationsState = {
  notifications: [],
  permission: 'default'
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<Omit<NotificationData, 'id'>>
    ) => {
      const id = Math.random().toString(36).substr(2, 9);
      state.notifications.push({ ...action.payload, id });
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    updatePermission: (state, action: PayloadAction<NotificationPermission>) => {
      state.permission = action.payload;
    }
  },
});

export const { addNotification, removeNotification, updatePermission } = notificationsSlice.actions;
export default notificationsSlice.reducer;
