import axios from "axios";
import { productDetailsSuccess, productDetailsFail, productDetailsRequest } from "../reducers/productDetails";

const listDetailsProducts = async (id, dispatch) => {
    try {
        dispatch(productDetailsRequest());

        const { data } = await axios.get(`/api/products/${id}`);

        dispatch(productDetailsSuccess(data));
    } catch (error) {
        dispatch(productDetailsFail(error.message));
        console.log(error);
    }
};

export default listDetailsProducts;
