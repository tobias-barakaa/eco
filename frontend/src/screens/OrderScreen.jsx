import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery, useDeliverOrderMutation,usePayOrderMutation, useGetPaypalClientIdQuery } from '../slices/ordersApiSlice';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { toast } from 'react-toastify';


const OrderScreen = () => {

   const { id: orderId } = useParams();
    const { data: order, error, isLoading } = useGetOrderDetailsQuery(orderId);
    



    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const { data: paypal, isLoading: loadingPayPal, error: errorPaypal } = useGetPaypalClientIdQuery();
    const { userInfo } = useSelector((state) => state.auth);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
     try {
        await payOrder({orderId: order._id, details});
        // refetch();
        toast.success('Order is paid');
     } catch (error) {
        toast.error(error?.data?.message || error.message)
        
     }
        })
    }
   async function onApproveTest() {
        await payOrder({orderId, details: {payer: {email_address: userInfo.email}}});
        // refetch();
        toast.success('Order is paid');
    }
    function onError() {
        toast.error('Order is not paid');
    }
    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice,
                    },
                },
            ],
        }).then((orderId) => {
            return orderId
        })
    }

    useEffect(() => {
        if (!errorPaypal && !loadingPayPal && paypal.clientId) {
            const loadPayaPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD'
                    }
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
             }
             if(order && !order.isPaid) {
                if(!window.paypal) {
                    loadPayaPalScript();
                }
             }
        }
    
    }, [order, paypal, paypalDispatch, errorPaypal, loadingPayPal]);

    const deliverOrderhandler = async () => {
        try {
            await deliverOrder(order._id);
            toast.success('Order is delivered');
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    }



const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

    
    return isLoading ? <Loader /> : error ? ( <Message variant='danger' />
        ) : 
            <>
                <h1>Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong> {order.user.name}
                                </p>
                                <p>
                                    <strong>Email: </strong>{' '}
                                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong>Address:</strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                                    {order.shippingAddress.postalCode},{' '}
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered ? (
                                    <Message variant='success'>
                                        Delivered on {order.deliveredAt}
                                    </Message>
                                ) : (
                                    <Message variant='danger'>Not Delivered</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method:</strong>
                                    {order.paymentMethod}
                                </p>
                                {order.isPaid ? (
                                    <Message variant='success'>Paid on {order.paidAt}</Message>
                                ) : (
                                    <Message variant='danger'>Not Paid</Message>
                                )}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? (
                                    <Message>Order is empty</Message>
                                ) : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fluid
                                                            rounded
                                                        /> 
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = $
                                                        {item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {!order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {!order.isPaid && (
                                            <PayPalButtons
                                                style={{ layout: 'horizontal' }}
                                                createOrder={(data, actions) => {
                                                    return actions.order.create({
                                                        purchase_units: [
                                                            {
                                                                amount: {
                                                                    value: order.totalPrice,
                                                                },
                                                            },
                                                        ],
                                                    });
                                                }}
                                                onApprove={async (data, actions) => {
                                                    const orderID = data.orderID;
                                                    const details = {
                                                        id: orderID,
                                                        status: data.status,
                                                        update_time: data.update_time,
                                                        payer: data.payer,
                                                    };
                                                    await payOrder({ orderId: order._id, details });
                                                    toast.success('Order is paid');
                                                }}
                                            />
                                        )}
                                    </ListGroup.Item>
                                )}
                                { loadingDeliver && <Loader /> }
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && 
                                (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            // onClick={() => deliverOrder(order._id)}
                                            onClick={deliverOrderhandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )
                                }
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
};


export default OrderScreen;