import React, { useEffect } from 'react'
import { Button, Col, Form, Row, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Message from '../components/Message'
import addToCart from '../actions/cartActions'
import { useLocation } from 'react-router-dom';



const CartScreen = ({match, history}) => {
    const {productId} = useParams()
    const location = useLocation()
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    
    const dispatch = useDispatch()

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    
    // const cart = useSelector((state)=>state.cart);
    // console.log(cart)
    // const {productId} = useParams()
    // const location = useLocation();
    // const params = new URLSearchParams(location.search);
    // const qtyParam = params.get('qty');
    // const qty = qtyParam ? Number(qtyParam) : 1;
    // console.log('qty =', qty);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    //       JSON.parse(localStorage.getItem('cartItems')) : [];
    //     dispatch({ type: 'cart/setItems', payload: cartItemsFromStorage });
      
    //     if (productId) {
    //       addToCart(productId, qty);
    //     }
    //   }, [dispatch, productId, qty]);

    return (
    <div>
      Cart
    </div>
  )
}

export default CartScreen
