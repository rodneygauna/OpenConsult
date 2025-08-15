/* Practice - View Profile  Page
 * This page displays the profile information of a specific practice.
 */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

// Import Axios for API requests
import { apiV1 } from "../../libs/axios.js";

import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Alert,
  Spinner,
  Button,
  ListGroup,
  ButtonGroup,
} from "react-bootstrap";

// PracticeViewPage Component
const PracticeViewPage = () => {
  const { id } = useParams();
  // State for practice data
  const [practice, setPractice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Helper function to format complete address
  const formatAddress = (practice) => {
    const addressParts = [];

    if (practice.address) addressParts.push(practice.address);
    if (practice.suite_unit_number)
      addressParts.push(`Suite ${practice.suite_unit_number}`);

    const locationParts = [];
    if (practice.city) locationParts.push(practice.city);
    if (practice.state) locationParts.push(practice.state);
    if (locationParts.length > 0) addressParts.push(locationParts.join(", "));

    if (practice.zip_code) addressParts.push(practice.zip_code);

    return addressParts.join(", ");
  };

  // Helper function to format phone number
  const formatPhoneNumber = (phone_number) => {
    if (!phone_number) return null;
    // Convert to string first to handle both string and number inputs
    const phoneStr = phone_number.toString();
    const cleaned = phoneStr.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6
      )}`;
    }
    return phoneStr; // Return as-is if not 10 digits
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fetch the practice's information
  const fetchPracticeInformation = async () => {
    if (!id) {
      setError("Invalid practice ID.");
      setLoading(false);
      return;
    }

    try {
      const response = await apiV1.get(`/practices/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setPractice(response.data);
    } catch (error) {
      console.error("Error fetching practice information:", error);
      setError(
        error.response?.data?.message ||
          "Failed to load practice informaiton. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPracticeInformation();
  }, [id]);

  // Return the component
  return (
    <div>
      <Container>
        <Row>
          <Col>
            {loading && (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}

            {practice && (
              <>
                {/* Practice Header */}
                <Card className="mb-4">
                  <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                      <h2 className="mb-0">{practice.practice_name}</h2>
                      <Badge bg={practice.is_active ? "success" : "danger"}>
                        {practice.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </Card.Header>
                </Card>

                {/* Address Information */}
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">
                      <i className="bi bi-geo-alt"></i> Address Information
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {practice.address && (
                        <ListGroup.Item>
                          <strong>Street Address:</strong> {practice.address}
                        </ListGroup.Item>
                      )}
                      {practice.suite_unit_number && (
                        <ListGroup.Item>
                          <strong>Suite/Unit:</strong>{" "}
                          {practice.suite_unit_number}
                        </ListGroup.Item>
                      )}
                      {practice.po_box_address && (
                        <ListGroup.Item>
                          <strong>PO Box:</strong> {practice.po_box_address}
                        </ListGroup.Item>
                      )}
                      {practice.city && (
                        <ListGroup.Item>
                          <strong>City:</strong> {practice.city}
                        </ListGroup.Item>
                      )}
                      {practice.state && (
                        <ListGroup.Item>
                          <strong>State:</strong> {practice.state}
                        </ListGroup.Item>
                      )}
                      {practice.zip_code && (
                        <ListGroup.Item>
                          <strong>ZIP Code:</strong> {practice.zip_code}
                        </ListGroup.Item>
                      )}
                      {formatAddress(practice) && (
                        <ListGroup.Item className="bg-light">
                          <strong>Full Address:</strong>{" "}
                          {formatAddress(practice)}
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>

                {/* Contact Information */}
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">
                      <i className="bi bi-telephone"></i> Contact Information
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {practice.phone_number && (
                        <ListGroup.Item>
                          <strong>Phone:</strong>
                          <a
                            href={`tel:${practice.phone_number}`}
                            className="ms-2"
                          >
                            {formatPhoneNumber(practice.phone_number)}
                          </a>
                        </ListGroup.Item>
                      )}
                      {practice.fax_number && (
                        <ListGroup.Item>
                          <strong>Fax:</strong>{" "}
                          {formatPhoneNumber(practice.fax_number)}
                        </ListGroup.Item>
                      )}
                      {practice.email && (
                        <ListGroup.Item>
                          <strong>Email:</strong>
                          <a href={`mailto:${practice.email}`} className="ms-2">
                            {practice.email}
                          </a>
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>

                {/* System Information */}
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">
                      <i className="bi bi-info-circle"></i> System Information
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Status:</strong>
                        <Badge
                          bg={practice.is_active ? "success" : "danger"}
                          className="ms-2"
                        >
                          {practice.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </ListGroup.Item>
                      {practice.createdAt && (
                        <ListGroup.Item>
                          <strong>Created:</strong>{" "}
                          {formatDate(practice.createdAt)}
                        </ListGroup.Item>
                      )}
                      {practice.updatedAt && (
                        <ListGroup.Item>
                          <strong>Last Updated:</strong>{" "}
                          {formatDate(practice.updatedAt)}
                        </ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card.Body>
                </Card>

                {/* Action Buttons */}
                <Card>
                  <Card.Body>
                    <ButtonGroup className="w-100">
                      <Button
                        variant="primary"
                        onClick={() => window.history.back()}
                      >
                        <i className="bi bi-arrow-left"></i> Back
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() =>
                          navigate(`/practices/edit/${practice._id}`)
                        }
                      >
                        <i className="bi bi-pencil"></i> Edit Practice
                      </Button>
                    </ButtonGroup>
                  </Card.Body>
                </Card>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PracticeViewPage;
