import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';



const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [register, {isLoading}] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }
    , [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        else {
        try {
            const resp = await register({name, email, password}).unwrap();
            dispatch(setCredentials({...resp}));
            navigate(redirect);
        } catch (error) {
            toast.error(error.data?.message || error.error)
        }
    }
    }
  return (
    <FormContainer>
        <h1>Sign UP</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Name Address</Form.Label>
                <Form.Control
                    type='name'
                    placeholder='Enter Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    onChange={(e) => setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            
            <Form.Group controlId='password'>
                <Form.Label>confirmPassword</Form.Label>
                <Form.Control
                    type='confirmPassword'
                    placeholder='Enter password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'className='mt-2'
            disabled={isLoading}
            >
                Register
            </Button>
            {isLoading && <Loader/>}
        </Form>
        <Row className='py-3'>
            <Col>
            Already have an account? <Link to='/login'>Login</Link>
            </Col>
        </Row>
      
    </FormContainer>
  )
}

export default RegisterScreen
