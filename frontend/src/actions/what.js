import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [] ,
    cartTotalQuantity : 0,
    cartTotalAmount : 0,
}
export const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addToCart (state, action) {
            const tempIndex = state.cartItems.findIndex( (item) => item._id === action.payload._id);
            if (tempIndex >=0) {
                state.cartItems[tempIndex].cartQuantity +=1;
                toast.info(`${state.cartItems[tempIndex].name} Quantity is Increased.!`, {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme : 'colored'
                    });
            }
            else {
                const tempProduct = { ...action.payload, cartQuantity : 1}
                state.cartItems.push(tempProduct);
                toast.success(`${tempProduct.name} Added to Cart.!`, {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme : 'colored'
                    });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart (state, action) {
            const nextCart = state.cartItems.filter( (item) => {
                return item._id !== action.payload._id;
            });
            state.cartItems = nextCart;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            toast.error(`${action.payload.name} is deleted from Cart`, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme : 'colored'
                });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        decreaseCart (state, action) {
            const tempIndex = state.cartItems.findIndex( (item) => item._id === action.payload._id );
            if ( state.cartItems[tempIndex].cartQuantity >1) {
                state.cartItems[tempIndex].cartQuantity -=1;
                toast.info(`${action.payload.name} Quantity is decreased.`, {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme : 'colored',
                    });
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
            else if(state.cartItems[tempIndex].cartQuantity === 1) {
                const tempProduct = state.cartItems.filter( (item) => item._id !== action.payload._id );
                state.cartItems = tempProduct;
                toast.error(`${action.payload.name} is deleted from Cart`, {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme : 'colored'
                    });
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }
        },
        increaseCart (state, action) {
            const tempIndex = state.cartItems.findIndex( (item) => item._id === action.payload._id );
            state.cartItems[tempIndex].cartQuantity +=1;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            toast.info(`${action.payload.name} Quantity is Increased!`, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme : 'colored',
                });
        },
        clearCart (state, action) {
            state.cartItems = [];
            toast.error('Cart is Cleared.', {
                position : "bottom-left",
                autoClose : 3000,
                hideProgressBar : false,
                closeOnClick : true,
                pauseOnHover : true,
                draggable : true,
                progress : undefined,
                theme : 'colored'
            });
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        cartTotal (state) {
            let totalQ = 0;
            let totalA = 0;
            const temp = state.cartItems.map( (items, act) => {
                const { cartQuantity, price } = items;
                const totalAmount = price * cartQuantity;
                //alert(JSON.stringify(totalAmount));
                totalA += totalAmount;
                totalQ += items.cartQuantity;
                const temp = {
                    totalA,
                    totalQ
                }
                return temp;
            })
            state.cartTotalAmount = temp.length > 0 ? temp[temp.length-1].totalA ? temp[temp.length-1].totalA : 0 : 0;
            state.cartTotalQuantity = temp.length > 0 ? temp[temp.length-1].totalQ ? temp[temp.length-1].totalQ : 0 : 0;
        }
    }
});
export const { addToCart, removeFromCart, increaseCart, decreaseCart, clearCart, cartTotal } = cartSlice.actions;
export default cartSlice.reducer;
export const getCart = (state) => state.cart.cartItems;
export const getCompleteCart = (state) => state.cart;

























import { configureStore } from '@reduxjs/toolkit';
import productReducer, { productsFetch } from '../features/productSlice';
import cartReducer, {cartTotal} from '../features/cartSlice'
const store = configureStore({
    reducer : {
        products : productReducer,
        cart : cartReducer,
    }
});

store.dispatch(productsFetch());
store.dispatch(cartTotal());
export default store;




import { useDispatch, useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, Grid, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import '../styles/cart.css';
import { cartTotal, clearCart, decreaseCart, getCart, getCompleteCart, increaseCart, removeFromCart } from '../../features/cartSlice';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }


export default function Cart() {
  const rowsData = useSelector(getCart);
  const subTotal = useSelector(getCompleteCart);
  useEffect(() => {
    dispatch(cartTotal());
  }, [subTotal]);
  const dispatch = useDispatch();
  const handleCartRemove = (product) => {
    dispatch(removeFromCart(product));
  }
  const handleCartIncrement = (product) => {
    dispatch(increaseCart(product));
  }
  const handleCartDecrement = (product) => {
    dispatch(decreaseCart(product));
  }
  const handleclearCart = () => {
    dispatch(clearCart());
  }
  return (
    <>
      <h1 className='mainHeading'>Shopping Cart</h1>
      {rowsData.length === 0 ? (
        <h3 style={{ textAlign: 'center' }}> Your Cart is Empty!</h3>
      ) :
        <div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TableContainer component={Paper} style={{ width: '97%' }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Item(s)</StyledTableCell>
                    <StyledTableCell align='center'>Product(s)</StyledTableCell>
                    <StyledTableCell align="center">Price</StyledTableCell>
                    <StyledTableCell align="center">Quantity</StyledTableCell>
                    <StyledTableCell align="center">Total</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsData.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        <img height={120} src={row.img} />
                      </StyledTableCell>
                      <StyledTableCell align='center' >{row.name}</StyledTableCell>
                      <StyledTableCell align="center">${row.price}</StyledTableCell>
                      <StyledTableCell align="center">
                        <ButtonGroup size='small'>
                          {row.cartQuantity === 1 ? (
                            <Button disabled>-</Button> ) : (
                            <Button onClick={() => handleCartDecrement(row)}>-</Button>
                          )
                          }
                          <Button disabled>{row.cartQuantity}</Button>
                          <Button onClick={() => handleCartIncrement(row)}>+</Button>
                        </ButtonGroup>
                      </StyledTableCell>
                      <StyledTableCell align="center">${row.cartQuantity * row.price}</StyledTableCell>
                      <StyledTableCell align="center">
                        <IconButton onClick={() => handleCartRemove(row)}>
                          <DeleteOutlineIcon
                            style={{ color: 'rgba(232,84,43)' }}
                          />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid
              container
              width='95%'
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '4%',
              }}

            >
              <Grid item xs={12} sm={6}>
                <Button
                  variant='contained'
                  style={{
                    backgroundColor: 'rgba(232,84,43)',
                  }}
                  onClick={() => handleclearCart()}
                >
                  Clear Cart
                </Button>
              </Grid>
              <Grid
                item
                xs={12} sm={6}
                style={{
                  textAlign: 'right',
                  maxWidth: '25%'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ margin: 0, color: '#3B3C36' }}>SubTotal</h3>
                  <h3 style={{ margin: 0, color: '#3B3C36' }}>${subTotal.cartTotalAmount}</h3>
                </div>
                <Button
                  variant='outlined'
                  size='large'
                  style={{
                    color: 'rgba(232,84,43)',
                    border: '1px solid rgba(232,84,43)',
                    minWidth: '100%',
                    marginTop: '10px'
                  }}
                >
                  Checkout
                </Button>
                <IconButton style={{ display: 'flex', flex: 'start' }}>
                  <Link to='/'>
                    <KeyboardBackspaceIcon style={{ color: '#3B3C36' }} />
                  </Link>
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </div>
      }
    </>
  )
}


//////////////another one


import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const initialState = {
  carts: fetchFromLocalStorage(),
  itemCount: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isItemCart = state.carts.find(
        (item) => item.id === action.payload.id
      );

      if (isItemCart) {
        const tempCart = state.carts.map((item) => {
          if (item.id === action.payload.id) {
            let tempQty = item.quantity + action.payload.quantity;
            let tempTotalPrice = tempQty + item.price;
            return {
              ...item,
              quantity: tempQty,
              totalPrice: tempTotalPrice,
            };
          } else {
            return item;
          }
        });

        state.carts = tempCart;
        storeInLocalStorage(state.carts);
      } else {
        state.carts.push(action.payload);
        storeInLocalStorage(state.carts);
      }
    },

    removeFromCart: (state, action) => {
      const tempCart = state.carts.filter((item) => item.id !== action.payload);
      state.carts = tempCart;
      storeInLocalStorage(state.carts);
    },

    clearCart: (state) => {
      state.carts = [];
      storeInLocalStorage(state.carts);
    },
    getCartTotal: (state) => {
      state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.price * cartItem.quantity);
      }, 0);
      state.itemCount = state.carts.length;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, getCartTotal } =
  cartSlice.actions;
export default cartSlice.reducer;




import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import categorySlice from "./CategorySlice";
import ProductSlice from "./ProductSlice";
import CartSlice from "./CartSlice";

export const store = configureStore({
  reducer: {
    categories: categorySlice,
    products: ProductSlice,
    carts: CartSlice,
  },
});

export default store;