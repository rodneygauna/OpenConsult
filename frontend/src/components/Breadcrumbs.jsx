// Bootstrap Breadcrumbs component
import PropTypes from "prop-types";

// Import Bootstrap
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Breadcrumbs component
const BreadcrumbsComponent = ({ children }) => {
  return <Breadcrumb>{children}</Breadcrumb>;
};

// PropTypes for validation
BreadcrumbsComponent.propTypes = {
  children: PropTypes.node,
};

// Export the component
export default BreadcrumbsComponent;
