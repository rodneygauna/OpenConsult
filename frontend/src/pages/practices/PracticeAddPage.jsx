/* Practices - Add a new practice page
 * Allows the Super User to add a new practice to this instance of OpenConsult
 */
import { useState } from "react";
import { useNavigate } from "react-router";

// Import Axios for API requests
import { apiV1 } from "../../libs/axios";

// Import React-Bootstrap Components
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

// PracticeAddPage Component
const PracticeAddPage = () => {
  // Navigation hook
  const navigate = useNavigate();

  // State for form data
  const [formData, setFormData] = useState({
    practice_name: "",
    address: "",
    suite_unit_number: "",
    po_box_address: "",
    city: "",
    state: "",
    zip_code: "",
    phone_number: "",
    fax_number: "",
    email: "",
    is_active: true,
  });
  // State for error messages
  const [error, setError] = useState("");
  // State for loading state
  const [loading, setLoading] = useState(false);

  // Handle form data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!"); // Debug log
    setError("");

    // Basic validation
    if (
      !formData.practice_name ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zip_code ||
      !formData.phone_number
    ) {
      console.log("Validation failed - missing required fields"); // Debug log
      setError("Please fill in all required fields.");
      return;
    }
    if (formData.zip_code < 10000 || formData.zip_code > 99999) {
      console.log("Validation failed - invalid zip code"); // Debug log
      setError("Zip code must be a 5-digit number.");
      return;
    }
    if (formData.state.length !== 2) {
      console.log("Validation failed - invalid state"); // Debug log
      setError("State must be a 2-letter code.");
      return;
    }
    if (
      formData.phone_number &&
      !/^\d{10}$/.test(formData.phone_number) // Check for 10-digit phone number
    ) {
      console.log("Validation failed - invalid phone number"); // Debug log
      setError("Phone number must be in the format 1234567890.");
      return;
    }
    if (
      formData.fax_number &&
      !/^\d{10}$/.test(formData.fax_number) // Check for 10-digit fax number
    ) {
      console.log("Validation failed - invalid fax number"); // Debug log
      setError("Fax number must be in the format 1234567890.");
      return;
    }

    console.log("All validations passed, making API call..."); // Debug log
    console.log("Form data:", formData); // Debug log

    // Set loading state
    setLoading(true);

    try {
      const response = await apiV1.post("/practices", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("Practice created successfully:", response.data);
      navigate("/practices");
    } catch (error) {
      console.error("Failed to create practice:", error);
      setError(
        error.response?.data?.message ||
          "Failed to add practice. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Render the component
  return (
    <div>
      <Container>
        <h1>Add a New Practice</h1>
        <p>This page allows you to add a new practice to OpenConsult.</p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="practiceName">
            <Form.Label>Practice Name</Form.Label>
            <Form.Control
              type="text"
              name="practice_name"
              placeholder="Enter practice name"
              value={formData.practice_name}
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">Required</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="practiceAddress">
            <Form.Label>Practice Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              placeholder="Enter practice address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">Required</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="practiceSuiteUnit">
            <Form.Label>Suite/Unit Number</Form.Label>
            <Form.Control
              type="text"
              name="suite_unit_number"
              placeholder="Enter suite/unit number (optional)"
              value={formData.suite_unit_number}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="practiceCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">Required</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="practiceState">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              placeholder="Enter state (2-letter code)"
              value={formData.state}
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">Required</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="practiceZipCode">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="number"
              name="zip_code"
              placeholder="Enter zip code (5 digits)"
              value={formData.zip_code}
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">Required</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="practicePhoneNumber">
            <Form.Label>Practice Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              placeholder="Enter practice phone number (e.g., 1234567890)"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
            <Form.Text className="text-muted">Required</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="practiceFaxNumber">
            <Form.Label>Practice Fax Number</Form.Label>
            <Form.Control
              type="text"
              name="fax_number"
              placeholder="Enter practice fax number (optional)"
              value={formData.fax_number}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="practiceEmail">
            <Form.Label>Practice Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter practice email (optional)"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            onClick={() => console.log("Button clicked!")}
          >
            {loading ? "Adding..." : "Add Practice"}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

// Export PracticeAddPage Component
export default PracticeAddPage;
