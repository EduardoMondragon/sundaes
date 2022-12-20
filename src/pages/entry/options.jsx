import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./scoopOption";
import ToppingOptions from "./toppingOption";
import { Row } from "react-bootstrap";
import AlertBanner from "../common/alertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexs/orderDetails";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        // handle error response
        setError(true);
      });
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOptions;
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  return error ? (
    <AlertBanner />
  ) : (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <Row>{optionItems}</Row>
      <h5
        style={{
          marginTop: 30,
          textAlign: "right",
        }}
      >
        {`${title.toLowerCase()} total : `}
        {formatCurrency(totals[optionType])}
      </h5>
      <hr style={{ backgroundColor: "white" }} />
    </>
  );
};

export default Options;
