import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'; // Import BrowserRouter
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async() => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('login')
    } catch (error) {
      console.error('Failed to logout', error);
    }
  }

  return (
      <header>
        <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>ProShop</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <LinkContainer to="/card">
                  <Nav.Link>
                    <i className="fas fa-shopping-cart"></i>
                    Cart
                  </Nav.Link>
                </LinkContainer>
                {
                  userInfo ? (
                    <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>
                          Profile
                        </NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item
                      onClick={logoutHandler}
                      >
                        Logout
                      </NavDropdown.Item>

                    </NavDropdown>


                  ) : (
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <i className="fas fa-user"></i>
                        Login
                      </Nav.Link>
                    </LinkContainer>
                  )
                }
                {userInfo && userInfo.is_staff && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>
                        Users
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>
                        Products
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>
                        Orders
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
  );
}

export default Header;
