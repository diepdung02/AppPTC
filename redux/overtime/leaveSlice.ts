import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LeaveRequest = {
  id: number;
  startDate: string;
  endDate: string;
  leaveType: string;
  reason: string;
  status: 'Đang chờ duyệt' | 'Đã được duyệt' | 'Đã bị từ chối';
  createdAt: string; 
  code:string;
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
      state.requests.unshift(action.payload)
    },
    updateLeaveRequestStatus: (state, action: PayloadAction<LeaveRequest>) => {
      const index = state.requests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
    deleteLeaveRequest: (state, action: PayloadAction<number>) => {
      state.requests = state.requests.filter(request => request.id !== action.payload);
    },
  },
});

export const { addLeaveRequest, updateLeaveRequestStatus, deleteLeaveRequest } = leaveSlice.actions;
export default leaveSlice.reducer;
