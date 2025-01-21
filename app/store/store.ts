import { configureStore } from "@reduxjs/toolkit";
import configSlice from './configSlince'
import notificationsSlice from './NotificationsSlice'

const store = configureStore({
    reducer: {
        config: configSlice,
        notifications: notificationsSlice,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;