import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
    products: [],
    loading: false,
    error: null
};

// Create a slice for product list reducers
const productListSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {
    productListRequest(state) {
      state.loading = true;
      state.products = [];
      state.error = null;
    },
    productListSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    },
    productListFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { productListRequest, productListSuccess, productListFail } = productListSlice.actions;

export default productListSlice.reducer;