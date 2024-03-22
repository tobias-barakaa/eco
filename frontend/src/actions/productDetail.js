import axios from "axios";

const listDetailsProducts = async (id) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`);
        localStorage.setItem('productDetails', JSON.stringify(data));
        return data;
    } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
    }
};

export default listDetailsProducts;
