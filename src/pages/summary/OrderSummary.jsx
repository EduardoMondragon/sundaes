import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexs/orderDetails";
import { formatCurrency } from "../../utilities";

const OrderSummary = () => {
  const { totals, optionsCounts } = useOrderDetails();
  const scoopsEntriesArray = Object.entries(optionsCounts.scoops); // [["chocolate",2],["vanilla",1]]
  const scoopsList = scoopsEntriesArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));
  const toppingsArray = Object.keys(optionsCounts.toppings);
  const toppingsList = toppingsArray.map((key) => <li key={key}>{key}</li>);
  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopsList}</ul>
      <h2>toppings: {formatCurrency(totals.toppings)}</h2>
      <ul>{toppingsList}</ul>
      <h1>total : {formatCurrency(totals.scoops + totals.toppings)}</h1>
      <SummaryForm />
    </div>
  );
};
export default OrderSummary;
