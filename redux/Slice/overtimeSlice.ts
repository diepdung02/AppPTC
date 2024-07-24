import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OvertimeRequest = {
  id: number;
  startDate: string; 
  startTime: string;
  endTime: string;
  reason: string;
  status: 'Đang chờ duyệt' | 'Đã được duyệt' | 'Đã bị từ chối';
  code:string;
  createdAt:string;
};

type OvertimeState = {
  requests: OvertimeRequest[];
};

const initialState: OvertimeState = {
  requests: [],
};

const overtimeSlice = createSlice({
  name: 'overtime',
  initialState,
  reducers: {
    addOvertimeRequest: (state, action: PayloadAction<OvertimeRequest>) => {
      state.requests.unshift(action.payload);
    },
    updateOvertimeRequestStatus: (state, action: PayloadAction<OvertimeRequest>) => {
      const index = state.requests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
    deleteOvertimeRequest: (state, action: PayloadAction<number>) => {
      state.requests = state.requests.filter(request => request.id !== action.payload);
    },
  },
});

export const { addOvertimeRequest, updateOvertimeRequestStatus, deleteOvertimeRequest } = overtimeSlice.actions;

export default overtimeSlice.reducer;
