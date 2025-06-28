// Bootstrap Modal component
import PropTypes from "prop-types";

// Import Bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Modal component
const ModalComponent = ({
  show,
  onHide,
  title,
  body,
  footer,
  size,
  centered,
  ...props
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size={size}
      centered={centered}
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      {footer && (
        <Modal.Footer>
          {footer.map((btn, index) => (
            <Button key={index} variant={btn.variant} onClick={btn.onClick}>
              {btn.label}
            </Button>
          ))}
        </Modal.Footer>
      )}
    </Modal>
  );
};

// PropTypes for validation
ModalComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
  footer: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      variant: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    })
  ),
  size: PropTypes.string,
  centered: PropTypes.bool,
};

// Default props
ModalComponent.defaultProps = {
  footer: [],
  size: "md",
  centered: false,
};

// Export the component
export default ModalComponent;
