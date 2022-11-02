import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./scoopOption";
import ToppingOptions from "./toppingOption";
import { Row } from "react-bootstrap";
import AlertBanner from "../common/alertBanner";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

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

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOptions;
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagepath}
    />
  ));
  return <Row>{optionItems}</Row>;
};

export default Options;
