// Bootstrap Button component
import PropTypes from "prop-types";

// Import Bootstrap
import Button from "react-bootstrap/Button";

// Button component
const ButtonComponent = ({ variant, size, onClick, children, ...props }) => {
  return (
    <Button variant={variant} size={size} onClick={onClick} {...props}>
      {children}
    </Button>
  );
};

// PropTypes for validation
ButtonComponent.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

// Default props
ButtonComponent.defaultProps = {
  variant: "primary",
};

// Export the component
export default ButtonComponent;
