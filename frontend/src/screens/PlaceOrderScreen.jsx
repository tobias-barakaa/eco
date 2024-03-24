import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate('/payment')
        } else if (!cart.paymentMethod) {
            navigate('/shipping')
        }
    }, [cart.paymentMethod, navigate, cart.shippingAddress])
    
  return (
    <div>
      
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>Column</Col>
        <Col md={4}>Column</Col>

      </Row>
    </div>
  )
}

export default PlaceOrderScreen
