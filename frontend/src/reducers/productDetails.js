import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    // product: null,
    reviews: [],
    // loading: false,
    // error: null
  };
  
  const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {
     
      productDetailsSuccess(state, action) {
        // state.loading = false;
        // state.product = action.payload.product;
        state.reviews = action.payload.reviews;
        // state.error = null;
      }
    }
  });

  export const { productDetailsSuccess } = productDetailsSlice.actions;

  export default productDetailsSlice.reducer;