import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Table } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useProfileMutation } from '../slices/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice'



const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if(userInfo) {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [userInfo, userInfo.name, userInfo.email])
    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();
    const { data: orders, isLoading, error } = useGetMyOrdersQuery();

    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
           try {
            const resp = await updateProfile({_id: userInfo._idname, 
                email, password}).unwrap();
                dispatch(setCredentials(resp))
                
        } catch (error) {
            toast.error('Error updating profile' || error.error)
           }
        }
    }

  return (
        <>
            <Col md={3}>
                <h2>User Profile</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My orders</h2>
                { isLoading ? <Loader /> : error ? (
                    <Message variant='danger'>
                    {error?.data?.message || error.error}
                    </Message>
                ) : (
                    <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order ) => {
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td>

                                
                            </tr>
                        })}

                    </tbody>
                    </Table>
                )}
            </Col>
        </>
      
  )
}

export default ProfileScreen
