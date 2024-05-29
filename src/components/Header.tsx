import '../scss/header.scss';

import { Navbar, Container, Nav, NavbarBrand, Form, Button } from 'react-bootstrap';
import { Link, } from 'react-router-dom';

import { logout } from '../store/slices/auth/authSlice';
import { useAppContext } from '../App';

const Header = () => {

  const {dispatch, navigate, loggedIn, user} = useAppContext();
  const {_id} = user || '';

  return (
    <Navbar bg="primary" data-bs-theme="dark" className='p-2 d-flex justify-content-center'>
      <Container >
        <Link to='/' className='me-3'>
          <NavbarBrand style={{fontWeight: 'bold'}}>Auto Forum</NavbarBrand>
        </Link>
        <Form className="d-flex w-50">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 header-search__bar"
            aria-label="Search"
          />
          <Button variant="primary">Search</Button>
        </Form>
        <Nav>
          {
            loggedIn && 
            <>
              <Button onClick={() => navigate(`/users/${_id}`)}>Profile</Button>
              <Button onClick={() => dispatch(logout())}>Logout</Button>
            </>
          }
          {
            !loggedIn && 
        <>
          <Button onClick={() => navigate('/auth/login')}>Login</Button>
          <Button onClick={() => navigate('/auth/registration')}>Register</Button>
        </>
          }
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;