import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import { useDeleteUsersMutation, useGetUsersQuery } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';


const UserListScreen = () => {
  const { data: users, refetch, isLoading, erros } = useGetUsersQuery();
  const [deleteUser, { isLoading: deleteLoading, error: deleteError }] = useDeleteUsersMutation();
  const deleteHandler = async (id) => {
    if(window.confirm("Are you sure you want to delete this user?")) {
        try {
            await deleteUser(id);
            refetch();
        } catch (error) {
            toast.error('whats wrong')
        }
        }

  }

  return (
    <div>
      <h1>Orders</h1>
      {isLoading ? <Loader /> : erros ? <Message variant='danger'>{erros}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>Email</th>
              <th>ADMIN</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.user && user.user.name}</td>
                <td>{user.createdAt.substring(0, 10)}</td>
                <td>${user.totalPrice}</td>
                <td>{user.isPaid ? user.paidAt.substring(0, 10) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}</td>
                <td>{user.isDelivered ? user.deliveredAt.substring(0, 10) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}</td>
                <td>
                  <LinkContainer to={`/order/${user._id}`}>
                    <Button variant='light' className='btn-sm'>Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )} 
      
    </div>
  )
}

export default UserListScreen
