/* Practice - List All Practices Page
 * This page lists all practices in the system.
 */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Import Axios for API requests
import { apiV1 } from "../../libs/axios";

// Import React-Bootstrap Components
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";

// Import Components
import NavbarComponent from "../../components/Navbar.jsx";

// PracticesListAllPage Component
const PracticesListAllPage = () => {
  const [practices, setPractices] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      <NavbarComponent />
      <Container>
        <h1>All Practices</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Row>
            {practices.map((practice) => (
              <Col key={practice.id} md={4}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>{practice.practice_name}</Card.Title>
                    <Card.Text>{practice.address}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/practices/${practice.id}`)}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

// Export the component
export default PracticesListAllPage;
