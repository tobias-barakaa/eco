import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card, Button, Table } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery, useDeliverOrderMutation,usePayOrderMutation, useGetPaypalClientIdQuery } from '../slices/ordersApiSlice';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify';
import { useCreateProductMutation, useDeleteProductMutation, useGetProductDetailsQuery } from '../slices/productApiSlice';
import { LinkContainer } from 'react-router-bootstrap';


const ProductListScreen = () => {
    
    const { data: products, isLoading, erros } = useGetProductDetailsQuery();
   const [createProduct, { refetch, isLoading: createLoading, error: createError, data: createData }] = useCreateProductMutation();
   
   

    const [deleteProduct, { isLoading: deleteLoading, error: deleteError }] = useDeleteProductMutation();


    const createProductHandler = async() => {
    if (window.confirm('Are you sure you want to create a product?')) {
        try {
            await createProduct();
            refetch();
        } catch (error) {
            toast.error('whats wrong')
        }

    }
    }
    
    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                refetch();
            } catch (error) {
                toast.error('whats wrong')
            }
        }
    }

  return (
    <>
    <Row className='align-items-center'>
        <Col>
        <h1>Products</h1>

        </Col>
        <Col className='text-end'>
            <Button className='btn-sm m-3'
            onClick={createProductHandler}
            >
                {/* <FaEdit /> */}
            </Button>
        </Col>

      
    </Row>

    {isLoading ? <Loader /> : erros ? <Message variant='danger'>{erros}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'
                    onClick={deleteHandler}
                    >
                      {/* <FaEdit /> */}
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
        </>

  )
}

export default ProductListScreen
