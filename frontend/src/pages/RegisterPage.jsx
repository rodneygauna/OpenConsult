import { useState } from "react";
import { Link, useNavigate } from "react-router";

// Import Bootstrap components
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

// Import custom hooks and components
import { useAuth } from "../hooks/useAuth";
import NavbarComponent from "../components/Navbar";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone_number: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword: _confirmPassword, ...registrationData } =
        formData;
      const result = await register(registrationData);

      if (result.success) {
        navigate("/"); // Redirect to home page after successful registration
      } else {
        setError(result.error);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavbarComponent />
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card>
              <Card.Header>
                <h4 className="text-center mb-0">Register for OpenConsult</h4>
              </Card.Header>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="first_name"
                          placeholder="Enter your first name"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="last_name"
                          placeholder="Enter your last name"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone_number"
                      placeholder="Enter your phone number (10 digits)"
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Register"}
                  </Button>
                </Form>

                <div className="text-center mt-3">
                  <p>
                    Already have an account? <Link to="/login">Login here</Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
