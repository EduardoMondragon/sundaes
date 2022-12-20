import { useEffect, useState } from "react";
import axios from "axios";
import { useOrderPhases } from "../../contexs/orderPhases";
import { useOrderDetails } from "../../contexs/orderDetails";

const Confirmation = () => {
  const { updatePhase, resetPhase } = useOrderPhases();
  const { resetOrder } = useOrderDetails();
  const [confirmationCode, setConfirmationCode] = useState("");
  useEffect(() => {
    axios
      .post("http://localhost:3030/order")
      .then((response) => {
        console.log(response.data);
        setConfirmationCode(response.data.orderNumber.toString());
      })
      .catch((error) => {
        // alert or something here
      });
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Thanks!!</h1>
        <h3>your order confirmation number is {confirmationCode}</h3>
        <button
          onClick={() => {
            resetPhase();
            resetOrder();
          }}
        >
          order new sundae
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
