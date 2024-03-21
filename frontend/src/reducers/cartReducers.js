import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartSuccess(state, action){
            const item = action.payload;
            const productItem = state.cartItems.find(product => product.id === item.id);
            if(productItem){
              productItem.quantity += 1;
            }else{
              state.cartItems.push(item);
            }
        },
        
        
    }
});


export const { cartSuccess } = cartSlice.actions;

export default cartSlice.reducer;