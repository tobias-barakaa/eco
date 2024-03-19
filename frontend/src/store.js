import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './reducers/productReducers';
import productDetails from './reducers/productDetails';


const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetails


    }
    
})

export default store
