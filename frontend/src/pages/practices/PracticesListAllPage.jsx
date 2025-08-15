/* Practice - List All Practices Page
 * This page lists all practices in the system.
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Import Axios for API requests
import { apiV1 } from "../../libs/axios";

// Import React-Bootstrap Components
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  ButtonGroup,
  Alert,
} from "react-bootstrap";

// PracticesListAllPage Component
const PracticesListAllPage = () => {
  const [practices, setPractices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Helper function to format complete address
  const formatAddress = (practice) => {
    const parts = [
      practice.address,
      practice.suite_unit_number,
      practice.city && practice.state
        ? `${practice.city}, ${practice.state}`
        : practice.city || practice.state,
      practice.zip_code,
    ].filter(Boolean);

    return parts.join(", ");
  };

  // Helper function to format contact info
  const formatContactInfo = (practice) => {
    const contacts = [];
    if (practice.phone_number) contacts.push(`Phone: ${practice.phone_number}`);
    if (practice.fax_number) contacts.push(`Fax: ${practice.fax_number}`);
    if (practice.email) contacts.push(`Email: ${practice.email}`);
    return contacts;
  };

  // Helper function to format PO Box if exists
  const formatPOBox = (practice) => {
    return practice.po_box_address
      ? `PO Box: ${practice.po_box_address}`
      : null;
  };

  // Fetch all practices on component mount
  useEffect(() => {
    const fetchPractices = async () => {
      try {
        const response = await apiV1.get("/practices", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPractices(response.data);
      } catch (err) {
        console.error("Failed to fetch practices:", err);
        setError("Failed to load practices. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPractices();
  }, []);

  return (
    <div>
      <Container>
        <h1>All Practices</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row className="mb-3">
          <Col>
            <Button
              variant="primary"
              onClick={() => navigate("/practices/add")}
            >
              Add Practice
            </Button>
          </Col>
        </Row>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Practice Name</th>
                <th>Address</th>
                <th>Contact Information</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {practices.map((practice) => (
                <tr key={practice._id}>
                  <td>
                    <strong>{practice.practice_name}</strong>
                    {!practice.is_active && (
                      <span className="badge bg-warning ms-2">Inactive</span>
                    )}
                  </td>
                  <td>
                    <div>{formatAddress(practice)}</div>
                    {formatPOBox(practice) && (
                      <div className="text-muted">
                        <small>{formatPOBox(practice)}</small>
                      </div>
                    )}
                  </td>
                  <td>
                    {formatContactInfo(practice).map((contact, index) => (
                      <div key={index} className="text-muted">
                        <small>{contact}</small>
                      </div>
                    ))}
                  </td>
                  <td>
                    {practice.is_active ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-warning">Inactive</span>
                    )}
                  </td>
                  <td>
                    <ButtonGroup size="sm">
                      <Button
                        variant="primary"
                        onClick={() =>
                          navigate(`/practices/view/${practice._id}`)
                        }
                      >
                        View
                      </Button>
                      <Button
                        variant="outline-primary"
                        onClick={() =>
                          navigate(`/practices/edit/${practice._id}`)
                        }
                      >
                        Edit
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

// Export the component
export default PracticesListAllPage;
