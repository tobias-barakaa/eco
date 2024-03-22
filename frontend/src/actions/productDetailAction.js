import { useParams } from "react-router-dom";
import axios from "axios";
import { productDetailsSuccess, productDetailsFail, productDetailsRequest } from "../reducers/productDetails";


const listDetailsProducts = () => async (dispatch) => {
    const { id } = useParams();
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