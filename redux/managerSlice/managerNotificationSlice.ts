import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ManagerNotificationItem {
  id: string;
  title: string;
  summary: string;
  icon: string;
  date: string;
  image: string;
  code: string; 
  startDate: string;

}

interface ManagerNotificationState {
  notifications: ManagerNotificationItem[];
}

const initialState: ManagerNotificationState = {
  notifications: [],
};

const managerNotificationSlice = createSlice({
  name: 'managerNotification',
  initialState,
  reducers: {
    addManagerNotification(state, action: PayloadAction<ManagerNotificationItem>) {
      state.notifications.unshift(action.payload);
    },
  },
});

export const { addManagerNotification } = managerNotificationSlice.actions;
export default managerNotificationSlice.reducer;
