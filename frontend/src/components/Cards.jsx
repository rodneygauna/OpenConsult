// Bootstrap Cards component
import PropTypes from "prop-types";

// Import Bootstrap
import Card from "react-bootstrap/Card";

// Cards component
const CardsComponent = ({ title, text, imageUrl, footer, ...props }) => {
  return (
    <Card {...props}>
      {imageUrl && <Card.Img variant="top" src={imageUrl} />}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
      </Card.Body>
      {footer && <Card.Footer className="text-muted">{footer}</Card.Footer>}
    </Card>
  );
};

// PropTypes for validation
CardsComponent.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  footer: PropTypes.string,
};

// Export the component
export default CardsComponent;
