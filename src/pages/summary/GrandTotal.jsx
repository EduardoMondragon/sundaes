import { useOrderDetails } from "../../contexs/orderDetails";
import { useOrderPhases } from "../../contexs/orderPhases";
import { formatCurrency } from "../../utilities";
const GrandTotal = () => {
  const { updatePhase } = useOrderPhases();
  const { scoops, toppings } = useOrderDetails().totals;
  return (
    <>
      <h2>Grand total : {formatCurrency(scoops + toppings)}</h2>
      <button
        style={{
          color: "white",
          backgroundColor: scoops <= 0 ? "gray" : "black",
          padding: "10px 30px",
        }}
        onClick={() => {
          scoops + toppings > 0 && updatePhase("orderSummary");
        }}
        disabled={scoops <= 0 ? true : false}
      >
        Order sundae
      </button>
    </>
  );
};

export default GrandTotal;
