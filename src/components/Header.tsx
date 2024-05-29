import { Navbar, Container, Nav, NavbarBrand, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/auth/authSlice';

import { RootState } from '../store/store';

import '../scss/header.scss';

const Header = () => {

  const dispatch = useDispatch();
  const {loggedIn} = useSelector((state: RootState) => state.auth);
  const {_id} = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : { _id: null};

  return (
    <Navbar bg="primary" data-bs-theme="dark" className='p-2 d-flex justify-content-center'>
      <Container >
        <Link to='/' className='me-3'>
          <NavbarBrand>Auto Forum</NavbarBrand>
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
              <Link to={`/users/${_id}`} className='me-3'>Profile</Link>
              <Button onClick={() => dispatch(logout())}>Logout</Button>
            </>
          }
          {
            !loggedIn && 
        <>
          <Link to='/auth/login' className='me-3'>Login</Link>
          <Link to='/auth/registration'>
              Register
          </Link>
        </>
          }
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;