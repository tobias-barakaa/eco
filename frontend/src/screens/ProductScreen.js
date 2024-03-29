import React, { useState } from 'react';
import { Col, Row, Image, Button, Card, ListGroup, Form, Toast } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import { useCreateReviewMutation, useGetProductDetailsQuery } from '../slices/productApiSlice';
import { addToCart } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';



const ProductScreen = () => {
    const [qty, setQty] = useState(1);
    const { id: productId } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data: product , refetch} = useGetProductDetailsQuery(productId);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');


    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();
    const { userInfo } = useSelector(state => state.auth);


    const addToCartHandler = () => {
      dispatch( addToCart ({ ...product, qty}))
      navigate(`/cart/${productId}?qty=${qty}`);
    }

    if (!product) {
        return <div>Loading...</div>; // Add loading indicator while data is being fetched
    }


    return (
        <div>
            <Link to="/" className='btn btn-light my-3'>Go back</Link>





            <Row>
                <Col md={6}>
                    {product.image && <Image src={product.image} alt={product.name} fluid />}
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f88e25'} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col xs='auto' className='my-1'>
                                            <Form.Control 
                                                as='select'
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}
                                            >
                                                {[...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button 
                                    onClick={addToCartHandler}
                                    className='btn-block' type='button' 
                                    disabled={product.countInStock === 0}
                                >
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row className='review'>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 && <div>No reviews</div>}
                    <ListGroup variant='flush'>
                        {product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} color={'#f88e25'} />
                                <p>{review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a customer review</h2>
                            {loadingProductReview && <div>Loading...</div>}
                            {userInfo ? (
                                <Form onSubmit={async (e) => {
                                    e.preventDefault();
                                    await createReview({ id: productId, rating, comment });
                                    await refetch();
                                    setRating(0);
                                    setComment('');
                                }}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control 
                                            as='select' 
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId='comment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control 
                                            as='textarea' 
                                            row='3' 
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                    <Button type='submit' variant='primary'>Submit</Button>
                                </Form>
                            ) : (
                                <Toast>
                                    <Toast.Header>
                                        <strong>Sign In</strong>
                                    </Toast.Header>
                                    <Toast.Body>Please <Link to='/login'>sign in</Link> to write a review</Toast.Body>
                                </Toast>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
}

export default ProductScreen;
