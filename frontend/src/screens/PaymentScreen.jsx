import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../slices/cartSlice'
import { Form, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'



const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);

    useEffect(() => {
        if (!cart.shippingAddress) {
            navigate('/shipping')
        }
    
    }, [cart, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder');
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                <Form.Check type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                className='my-2'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>

                <Button 
                type='submit'
                variant='primary'
                >Continue</Button>
                </Col>
            </Form.Group>
        </Form>
      
    </FormContainer>
  )
}

export default PaymentScreen
