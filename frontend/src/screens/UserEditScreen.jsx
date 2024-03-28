import { useEffect, useState } from "react"
import { Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Form, Link, useNavigate, useParams } from "react-router-dom"
import Message from "../components/Message"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from "../slices/productApiSlice"
import FormContainer from "../components/FormContainer";
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../slices/usersApiSlice"



const UserEditScreen = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState(0);
    const [isAdmin, setIsAdmin] = useState(false);

    const [userEdit, { loadingUpdate, isLoading: updateLoading, error: updateError }] = useUpdateProductMutation();

    const { data: user, isLoading, error } = useUpdateUserMutation()//userId);

    useEffect(() => {
        if(user) {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
            
        }
    }, [user]);

    const submitHandler = async(e) => {
        e.preventDefault();
        // try {
        //     await useUpdateUserMutation({ userId, name , email, isAdmin });
        //     toast.success('User Updated');
        //     refetch();
        //     navigate('/admin/userlist')
        // } catch (error) {
            
        // }
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
                    <Form.Group controlId='email'>
                        <Form.Label>email</Form.Label>
                        <Form.Control type='number' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                   
                    <Form.Group controlId='name'>
                        <Form.Label>name</Form.Label>
                        <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId='isAdmin'>
                        <Form.Label>isAdmin</Form.Label>
                        <Form.Control type='text' placeholder='Enter isAdmin' value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Check
                        type='checkbox'
                        label='Is Admin'
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                        ></Form.Check>
                    </Form.Group>
                    
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
                )
            }
        </FormContainer>
      
    </div>
  )
}

export default UserEditScreen
