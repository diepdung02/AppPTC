import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Image } from 'react-native';

export type LeaveRequest = {
  id: number;
  startDate: string;
  endDate: string;
  leaveType: string;
  reason: string;
  status: 'Đang chờ duyệt' | 'Đã được duyệt' | 'Đã bị từ chối';
  createdAt: string; 
  code:string;
  dayOffs:string,
  usedDaysOff: string; 
  remainingDaysOff: string; 
};

export type NotificationItem = {
  id: string;
  title: string;
  summary: string;
  date: string;
  image:string;
  icon:string;
};

interface LeaveState {
  requests: LeaveRequest[];
  notifications: NotificationItem[];
}

const initialState: LeaveState = {
  requests: [],
  notifications: [],
};

const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    addLeaveRequest: (state, action: PayloadAction<LeaveRequest>) => {
      state.requests.unshift(action.payload)
    },
    updateLeaveRequestStatus(state, action: PayloadAction<LeaveRequest>) {
      const index = state.requests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
    addNotification(state, action: PayloadAction<NotificationItem>) {
      if (!state.notifications) {
        state.notifications = [];
      }
      state.notifications.unshift(action.payload);
    },
    deleteLeaveRequest(state, action: PayloadAction<number>) {
      state.requests = state.requests.filter(req => req.id !== action.payload);
    },
  },
});

export const { updateLeaveRequestStatus,addLeaveRequest, addNotification, deleteLeaveRequest } = leaveSlice.actions;
export default leaveSlice.reducer;
