import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  id: number;
  componentIndex: number;
}

const initialState: ProductState[] = [];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    completeProducts(state, action: PayloadAction<{ id: number, componentIndex: number }[]>) {
      return action.payload;
    },
  },
});

export const { completeProducts } = productSlice.actions;

export default productSlice.reducer;
