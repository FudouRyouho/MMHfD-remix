import { configureStore } from "@reduxjs/toolkit";
import configSlice from './configSlince'
import notificationsSlice from './NotificationsSlice'
import filtersSlice from './FiltersSlince'

const store = configureStore({
    reducer: {
        config: configSlice,
        filters: filtersSlice,
        notifications: notificationsSlice,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;