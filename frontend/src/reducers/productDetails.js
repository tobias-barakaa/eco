import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    // product: null,
    product: [],
    loading: false,
    error: null
  };
  
  const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {
      productDetailsRequest(state) {
        state.loading = true;
        state.error = null;
      },
      productDetailsSuccess(state, action) {
        // state.loading = false;
        state.product = action.payload.product;
        // state.reviews = action.payload.reviews;
        // state.error = null;
      },
      productDetailsFail(state, action) {
        state.loading = false;
        state.error = action.payload;
      }
    }
  });

  export const { 
    productDetailsSuccess, productDetailsFail, productDetailsRequest } = productDetailsSlice.actions;

  export default productDetailsSlice.reducer;