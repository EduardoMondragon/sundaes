import { Col, Form, Row } from "react-bootstrap";
import { useOrderDetails } from "../../contexs/orderDetails";

const ToppingOption = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails();
  //
  const handleChange = (checked) => {
    console.log(checked);
    const itemAmount = checked ? 1 : 0;
    updateItemCount(name, itemAmount, "toppings");
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "50%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
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
            type="checkbox"
            defaultValue={0}
            onChange={(e) => handleChange(e.target.checked)}
            disabled={false}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
