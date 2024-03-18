// import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension'


// const reducer = combineReducers({})

// const initialState = {}
// const middleware = [thunk]
// const store = createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// )



import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './reducers/productReducers';


const store = configureStore({
    reducer: {
        productList: productListReducer
    }
    
})

export default store
