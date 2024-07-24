import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CreateLeftDept = {
  id: number;
  startDate: string; 
  startTime: string;
  endTime: string;
  reason: string;
  status: 'Đang chờ duyệt' | 'Đã được duyệt' | 'Đã bị từ chối';
};

type LeftDeptState = {
  requests: CreateLeftDept[];
};

const initialState: LeftDeptState = {
  requests: [],
};

const leftDeptSlice = createSlice({
  name: 'LeftDeptScreen',
  initialState,
  reducers: {
    addCreateLeftDept: (state, action: PayloadAction<CreateLeftDept>) => {
      state.requests.unshift(action.payload);
    },
    updateCreateLeftDeptStatus: (state, action: PayloadAction<CreateLeftDept>) => {
      const index = state.requests.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.requests[index] = action.payload;
      }
    },
    deleteCreateLeftDept: (state, action: PayloadAction<number>) => {
      state.requests = state.requests.filter(request => request.id !== action.payload);
    },
  },
});

export const { addCreateLeftDept, updateCreateLeftDeptStatus, deleteCreateLeftDept } = leftDeptSlice.actions;

export default leftDeptSlice.reducer;
