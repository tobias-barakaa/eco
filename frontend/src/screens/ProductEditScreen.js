import { useEffect, useState } from "react"
import { Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Form, Link, useNavigate, useParams } from "react-router-dom"
import Message from "../components/Message"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from "../slices/productApiSlice"
import FormContainer from "../components/FormContainer";



const ProductEditScreen = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
    const [updateProduct, { loadingUpdate, isLoading: updateLoading, error: updateError }] = useUpdateProductMutation();


    useEffect(() => {
        if(product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const submitHandler = async(e) => {}
    const uploadFileHandler = async(e) => {
        const formData = new FormData();
        try {
            const resp = await uploadProductImage(formData);
            setImage(resp.image);
            toast.success(resp.message)
        } catch (error) {
            toast.error('error')
        }
    }

    const [uploadProductImage, {isLoading: uploadLoading, error: uploadError}] = useUploadProductImageMutation();

    
  return (
    <div>
        <Link to="/admin/productlist" className="btn btn-light my-3">Go Back</Link>
        <h1>Edit Product</h1>
        <FormContainer>
            <h1>Edit </h1>
            {
                loadingUpdate && <Loader />

            }
            {
                isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='name' placeholder='Enter Name' 
                        value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='image'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type='text' placeholder='Enter 
                        Image' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                     <Form.Control type='file' Label='choose file'
                     onChange={uploadFileHandler}
                     >

                     </Form.Control>
                   
                    </Form.Group>
                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type='text' placeholder='Enter Brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control type='number' placeholder='Enter Count In Stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type='text' placeholder='Enter Category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type='text' placeholder='Enter Description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
                )
            }
        </FormContainer>
      
    </div>
  )
}

export default ProductEditScreen
