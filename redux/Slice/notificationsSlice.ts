import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationItem = {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
};

type NotificationsState = {
  notifications: NotificationItem[];
};

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<NotificationItem>) {
      state.notifications.push(action.payload);
    },
  },
});

export const { addNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
