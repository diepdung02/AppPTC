import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LeaveRequest = {
  id: number;
  startDate: string;
  endDate: string;
  leaveType: string;
  reason: string;
  status: 'Đang chờ duyệt' | 'Đã được duyệt' | 'Đã bị từ chối';
};

type LeaveState = {
  requests: LeaveRequest[];
};

const initialState: LeaveState = {
  requests: [],
};

const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    addLeaveRequest: (state, action: PayloadAction<LeaveRequest>) => {
      state.requests.push(action.payload);
    },
    updateLeaveRequestStatus: (state, action: PayloadAction<LeaveRequest>) => {
      const index = state.requests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
  },
});

export const { addLeaveRequest, updateLeaveRequestStatus } = leaveSlice.actions;
export default leaveSlice.reducer;
