// import { createSlice } from "@reduxjs/toolkit";

// const cartItemsFromLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
// const initialState = cartItemsFromLocalStorage && JSON.parse(cartItemsFromLocalStorage).cartItems
//     ? JSON.parse(cartItemsFromLocalStorage)
//     : { cartItems: [] };

// const updateLocalStorage = (state) => {
//     localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
// };

// export const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         cartSuccess(state, action) {
//             const item = action.payload;
      
//             // Check if cartItems exist in the state
//             if (state.cartItems) {
//               const existItem = state.cartItems.find((x) => x._id === item._id);
      
//               if (existItem) {
//                 state.cartItems = state.cartItems.map((x) =>
//                   x._id === existItem._id ? item : x
//                 ); 
//               } else {
//                 state.cartItems = [...state.cartItems, item];
//               }
//             } else {
//               state.cartItems = [item]; 
//             }
      
//             updateLocalStorage(state.cartItems);
//           },
//     }
// });


// export const { cartSuccess } = cartSlice.actions;

// export default cartSlice.reducer;