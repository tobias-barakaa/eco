// import axios from 'axios';
// import { cartSuccess } from '../reducers/cartReducers';

// const addToCart = (id, qty) => async (dispatch, getState) => {
//   try {
//     const { data } = await axios.get(`/api/products/${id}`);
//     dispatch(cartSuccess({
//         id: data._id,
//         name: data.name,
//         image: data.image,
//         price: data.price,
//         countInStock: data.countInStock,
//         qty,
//     }));

//     // Save cartItems to local storage
//     localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)); 
//   } catch (error) {
//     // Handle error
//     console.error(error);
//   }
// };

// export default addToCart;
