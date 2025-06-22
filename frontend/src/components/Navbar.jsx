import { Link } from "react-router";

// Import Bootstrap Components
import { Navbar, Nav } from "react-bootstrap";

// Navbar Component
const NavbarComponent = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          OpenConsult
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

// Export Navbar Component
export default NavbarComponent;
