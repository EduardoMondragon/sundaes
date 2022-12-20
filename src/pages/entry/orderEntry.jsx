import Options from "./options";
import GrandTotal from "../summary/GrandTotal";

const OrderEntry = () => {
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <GrandTotal />
    </div>
  );
};

export default OrderEntry;
