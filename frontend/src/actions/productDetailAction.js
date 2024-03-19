// import axios from "axios";
// import { productListRequest, productListSuccess, productListFail } from "../reducers/productReducers";


// const listProducts = () => async (dispatch) => {
//     try {
//         dispatch(productListRequest());

//         const { data } = await axios.get('/api/products');

//         dispatch(productListSuccess(data));
//     } catch (error) {
//         dispatch(productListFail(error.message));
//         console.log(error);
//     }
// };


// export default listProducts;