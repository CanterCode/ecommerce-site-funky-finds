import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top" className="w-100 shadow-sm">
        <Navbar.Brand as={Link} to="/">
          E-Commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/products">
              View Products
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <BsCart3 size={20} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;