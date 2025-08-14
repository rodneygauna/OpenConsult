/* User - View Profile Page
 * This page displays the user's profile information.
 */
import { useState, useEffect } from "react";

// Import Axios for API requests
import { apiV1 } from "../../libs/axios";

// Import React-Bootstrap Components
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Alert,
  Spinner,
  Button,
} from "react-bootstrap";

// Import Components
import NavbarComponent from "../../components/Navbar.jsx";

// ProfileViewPage Component
const ProfileViewPage = () => {
  // State for user data
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper function to format user's full name
  const formatFullName = (user) => {
    const parts = [
      user.first_name,
      user.middle_name,
      user.last_name,
      user.suffix,
    ].filter(Boolean);
    return parts.join(" ");
  };

  // Helper function to format phone number
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "Not provided";
    const phone = phoneNumber.toString();
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
  };

  // Helper function to get role badge variant
  const getRoleBadgeVariant = (role) => {
    const variants = {
      Admin: "danger",
      Provider: "primary",
      Specialist: "success",
      Staff: "secondary",
    };
    return variants[role] || "secondary";
  };

  // Helper function to get user type badge variant
  const getUserTypeBadgeVariant = (type) => {
    const variants = {
      Admin: "danger",
      "Super User": "warning",
      User: "info",
    };
    return variants[type] || "info";
  };

  // Fetch the user's profile information
  const fetchUserProfile = async () => {
    try {
      const response = await apiV1.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to load profile information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div>
      <NavbarComponent />
      <Container className="mt-4">
        <Row>
          <Col>
            <h1 className="mb-4">My Profile</h1>
          </Col>
        </Row>

        {error && (
          <Alert variant="danger" className="mb-4">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="mt-2">Loading profile information...</p>
          </div>
        ) : user ? (
          <Row>
            {/* Personal Information Card */}
            <Col lg={6} className="mb-4">
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Personal Information</h5>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>Full Name:</strong>
                    </Col>
                    <Col sm={8}>{formatFullName(user)}</Col>
                  </Row>

                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>First Name:</strong>
                    </Col>
                    <Col sm={8}>{user.first_name}</Col>
                  </Row>

                  {user.middle_name && (
                    <Row className="mb-3">
                      <Col sm={4}>
                        <strong>Middle Name:</strong>
                      </Col>
                      <Col sm={8}>{user.middle_name}</Col>
                    </Row>
                  )}

                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>Last Name:</strong>
                    </Col>
                    <Col sm={8}>{user.last_name}</Col>
                  </Row>

                  {user.suffix && (
                    <Row className="mb-3">
                      <Col sm={4}>
                        <strong>Suffix:</strong>
                      </Col>
                      <Col sm={8}>{user.suffix}</Col>
                    </Row>
                  )}
                </Card.Body>
              </Card>
            </Col>

            {/* Contact Information Card */}
            <Col lg={6} className="mb-4">
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Contact Information</h5>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>Email:</strong>
                    </Col>
                    <Col sm={8}>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>Phone:</strong>
                    </Col>
                    <Col sm={8}>
                      <a href={`tel:${user.phone_number}`}>
                        {formatPhoneNumber(user.phone_number)}
                      </a>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Account Information Card */}
            <Col lg={6} className="mb-4">
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Account Information</h5>
                </Card.Header>
                <Card.Body>
                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>User Role:</strong>
                    </Col>
                    <Col sm={8}>
                      <Badge bg={getRoleBadgeVariant(user.user_role)}>
                        {user.user_role}
                      </Badge>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>User Type:</strong>
                    </Col>
                    <Col sm={8}>
                      <Badge bg={getUserTypeBadgeVariant(user.user_type)}>
                        {user.user_type}
                      </Badge>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>Status:</strong>
                    </Col>
                    <Col sm={8}>
                      <Badge bg={user.is_active ? "success" : "danger"}>
                        {user.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>Member Since:</strong>
                    </Col>
                    <Col sm={8}>
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col sm={4}>
                      <strong>Last Updated:</strong>
                    </Col>
                    <Col sm={8}>
                      {new Date(user.updatedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Practice Information Card (if applicable) */}
            {user.practice_id && (
              <Col lg={6} className="mb-4">
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Practice Information</h5>
                  </Card.Header>
                  <Card.Body>
                    <Row className="mb-3">
                      <Col sm={4}>
                        <strong>Practice ID:</strong>
                      </Col>
                      <Col sm={8}>{user.practice_id}</Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            )}

            {/* Actions */}
            <Col xs={12}>
              <Card>
                <Card.Body className="text-center">
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => (window.location.href = "/profile/edit")}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => window.history.back()}
                  >
                    Go Back
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <Alert variant="warning">No profile information available.</Alert>
        )}
      </Container>
    </div>
  );
};

// Export the ProfileViewPage component
export default ProfileViewPage;
