import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './reducers/productReducers';
import productDetails from './reducers/productDetails';
import cartReducers from './reducers/cartReducers';
import { setupListeners } from "@reduxjs/toolkit/query/react";






const cartItemsFromStorage = localStorage.getItem('cartItems') ?
JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: { cartItems: cartItemsFromStorage }
}

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetails,
        cart: cartReducers
    },
    preloadedState: initialState
})

export default store

