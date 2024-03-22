import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './reducers/productReducers';
import productDetails from './reducers/productDetails';
import cartReducers from './reducers/cartReducers';
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';







const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        // productList: productListReducer,
        // productDetails: productDetails,
        // cart: cartReducers
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store

