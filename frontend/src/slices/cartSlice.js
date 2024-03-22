import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart') ? JSON.parse
(localStorage.getItem('cart')) : { cartItems: [] };

const addDecimals = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
    const item = action.payload;
    const existItem = state.cartItems.find((x) => x._id === item._id);
    if (existItem) {
        state.cartItems = state.cartItems.map((x) => x._id ===
        existItem._id ? item : x);

        } else {
            state.cartItems = [...state.cartItems, item];
        }
        // calculate item price

        state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

        // calculate shipping price
        state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
        // calculate tax price
        state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
        // calculate tatoal price 
        state.totalPrice = (
            Number(state.itemsPrice) + 
            Number(state.shippingPrice) + 
            Number(state.taxPrice)).toFixed(2);

        localStorage.setItem('cart', JSON.stringify(state));

    },
    removeFromCart: (state, action) => { 
        state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
        localStorage.setItem('cart', JSON.stringify(state));
    
    }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

