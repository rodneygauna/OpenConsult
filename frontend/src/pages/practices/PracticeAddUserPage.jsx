/* Practice - Add User page
 * Add a user to the practice
 */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

// Import Axios for API requests
import { apiV1 } from "../../libs/axios.js";

// Import Bootstrap components
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";

const PracticeAddUserPage = () => {
  const { id } = useParams(); // Practice ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    phone_number: "",
    email: "",
    user_role: "Staff",
    user_type: "User",
    is_active: true,
  });

  const [practice, setPractice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [practiceLoading, setPracticeLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch practice information
  const fetchPracticeInfo = async () => {
    try {
      const response = await apiV1.get(`/practices/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPractice(response.data);
    } catch (error) {
      console.error("Error fetching practice:", error);
      setError("Failed to load practice information");
    } finally {
      setPracticeLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPracticeInfo();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Phone number validation (basic)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone_number.replace(/\D/g, ""))) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);

    try {
      // Prepare user data
      const userData = { ...formData };
      userData.practice_id = id; // Assign to current practice

      // Create user
      const response = await apiV1.post("/users", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      setSuccess(
        `User ${userData.first_name} ${userData.last_name} has been successfully added to the practice! A welcome email with login credentials has been sent to ${userData.email}.`
      );

      // Reset form
      setFormData({
        first_name: "",
        middle_name: "",
        last_name: "",
        suffix: "",
        phone_number: "",
        email: "",
        user_role: "Staff",
        user_type: "User",
        is_active: true,
      });

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate(`/practices/view/${id}`);
      }, 3000);
    } catch (error) {
      console.error("Error creating user:", error);
      setError(
        error.response?.data?.message ||
          "Failed to create user. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (practiceLoading) {
    return (
      <Container>
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-2">Loading practice information...</p>
        </div>
      </Container>
    );
  }

  if (!practice) {
    return (
      <Container>
        <Alert variant="danger">
          Practice not found or you don't have permission to add users to this
          practice.
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className="mb-4">
            <h2 className="text-center mb-1">Add New User</h2>
            <p className="text-center text-muted mb-4">
              Adding user to <strong>{practice.practice_name}</strong>
            </p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Personal Information Section */}
            <h5 className="mb-3">Personal Information</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="Enter first name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder="Enter last name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="middle_name"
                    placeholder="Enter middle name (optional)"
                    value={formData.middle_name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Suffix</Form.Label>
                  <Form.Select
                    name="suffix"
                    value={formData.suffix}
                    onChange={handleChange}
                  >
                    <option value="">Select suffix (optional)</option>
                    <option value="Jr">Jr</option>
                    <option value="Sr">Sr</option>
                    <option value="I">I</option>
                    <option value="II">II</option>
                    <option value="III">III</option>
                    <option value="IV">IV</option>
                    <option value="V">V</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <hr />

            {/* Contact Information Section */}
            <h5 className="mb-3">Contact Information</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number *</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone_number"
                    placeholder="Enter 10-digit phone number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <hr />

            {/* Account Information Section */}
            <h5 className="mb-3">Account Information</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>User Role *</Form.Label>
                  <Form.Select
                    name="user_role"
                    value={formData.user_role}
                    onChange={handleChange}
                    required
                  >
                    <option value="Staff">Staff</option>
                    <option value="Provider">Provider</option>
                    <option value="Specialist">Specialist</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>User Type *</Form.Label>
                  <Form.Select
                    name="user_type"
                    value={formData.user_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="User">User</option>
                    <option value="Super User">Super User</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Alert variant="info" className="mb-3">
              <i className="bi bi-info-circle"></i> A temporary password will be
              automatically generated for this user and sent to their email
              address.
            </Alert>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="is_active"
                label="Active user (user can log in and access the system)"
                checked={formData.is_active}
                onChange={handleChange}
              />
            </Form.Group>

            <hr />

            {/* Action Buttons */}
            <div className="d-flex gap-2">
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="flex-fill"
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Creating User...
                  </>
                ) : (
                  "Add User to Practice"
                )}
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => navigate(`/practices/view/${id}`)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PracticeAddUserPage;
