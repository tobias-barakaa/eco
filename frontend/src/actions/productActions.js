// import axios from "axios"
// import { useDispatch, useSelector } from "react-redux"



// const listProducts = () => async () => {
//     const dispatch = useDispatch()
//     try {
//         dispatch()
//       const { data } = await axios.get('/api/products')
//       dispatch({ type: loading, payload: data })
      

//     } catch (error) {
//         console.log(error)
//     }

// }

// export { listProducts }

import axios from "axios";
import { productListRequest, productListSuccess, productListFail } from "../reducers/productReducers";


const listProducts = () => async (dispatch) => {
    try {
        // Dispatch productListRequest action to indicate the start of product list fetching
        dispatch(productListRequest());

        // Fetch data from the API
        const { data } = await axios.get('/api/products');

        // Dispatch productListSuccess action with the fetched data
        dispatch(productListSuccess(data));
    } catch (error) {
        // Dispatch productListFail action with the error message
        dispatch(productListFail(error.message));
        console.log(error);
    }
};

export default listProducts;
// export { listProducts }



