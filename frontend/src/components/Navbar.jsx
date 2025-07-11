import { Link } from "react-router";

// Import Bootstrap Components
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

// Import Auth Hook
import { useAuth } from "../hooks/useAuth";

// Navbar Component
const NavbarComponent = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <Navbar bg="light" expand="lg" className="mb-4">
        <div className="container">
          <Navbar.Brand as={Link} to="/">
            OpenConsult
          </Navbar.Brand>
        </div>
      </Navbar>
    );
  }

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
          <Nav className="justify-content-end">
            {isAuthenticated() ? (
              // Show user menu when logged in
              <NavDropdown
                title={`${user?.first_name || "User"} ${user?.last_name || ""}`}
                id="user-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/dashboard">
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // Show login/register when not logged in
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

// Export Navbar Component
export default NavbarComponent;
