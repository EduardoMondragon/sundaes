import { Col, Form, Row } from "react-bootstrap";
import { useOrderDetails } from "../../contexs/orderDetails";

const ScoopOption = ({ name, imagePath }) => {
  //
  const { updateItemCount } = useOrderDetails();
  //
  const handleChange = (e) =>
    updateItemCount(name, parseInt(e.target.value), "scoops");
  //
  const image = `http://localhost:3030/${imagePath}`;
  //
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img style={{ width: "50%" }} src={image} alt={`${name} scoop`} />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: "10px" }}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            disabled={false}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ScoopOption;
