// Bootstrap input component with label, placeholder, and optional sub-label support
import PropTypes from "prop-types";

// Import Bootstrap
import Form from "react-bootstrap/Form";

// Input component
const InputComponent = ({
  label,
  inputType,
  placeholder,
  subLabel,
  ...props
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control type={inputType} placeholder={placeholder} {...props} />
      {subLabel && <Form.Text className="text-muted">{subLabel}</Form.Text>}
    </Form.Group>
  );
};

// PropTypes for validation
InputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  placeholder: PropTypes.string,
  subLabel: PropTypes.string,
};

// Default props
InputComponent.defaultProps = {
  inputType: "text",
};

// Export the component
export default InputComponent;
