import axios from "axios";
import { productListRequest, productListSuccess, productListFail } from "../reducers/productReducers";


const listProducts = () => async (dispatch) => {
    try {
        dispatch(productListRequest());

        const { data } = await axios.get('/api/products');

        dispatch(productListSuccess(data));
    } catch (error) {
        dispatch(productListFail(error.message));
        console.log(error);
    }
};


export default listProducts;


// import axios from "axios";
// import { productListRequest,
//     productListSuccess,
//     productListFail,
//     // productDetailsRequest,
//     // productDetailsSuccess,
//     // productDetailsFail 
// } from "../reducers/productReducers";


// export const listProducts = () => async (dispatch) => {
//     try {
//         dispatch(productListRequest());

//         const { data } = await axios.get('/api/products');

//         dispatch(productListSuccess(data));
//     } catch (error) {
//         dispatch(productListFail(error.message));
//         console.log(error);
//     }
// };

// export const productDetails = (productId) => async (dispatch) => {
//     try {
//         dispatch(productDetailsRequest());

//         const { data } = await axios.get(`/api/products/${productId}`);

//         dispatch(productDetailsSuccess(data));
//     } catch (error) {
//         dispatch(productDetailsFail(error.message));
//         console.log(error);
//     }
// };







