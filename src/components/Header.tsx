import { Navbar, Container, Nav, NavbarBrand, Form, Button } from 'react-bootstrap';

import '../scss/header.scss';

const Header = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container >
        <NavbarBrand href="home">Auto Forum</NavbarBrand>
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
          <Nav.Link>Login</Nav.Link>
          <Nav.Link>
              Register
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;