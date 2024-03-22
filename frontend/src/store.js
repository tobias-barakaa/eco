import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './reducers/productReducers';
import productDetails from './reducers/productDetails';
import cartReducers from './reducers/cartReducers';
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from './slices/apiSlice';







const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        // productList: productListReducer,
        // productDetails: productDetails,
        // cart: cartReducers
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store

