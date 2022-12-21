import { useEffect, useState } from "react";
import axios from "axios";
import { useOrderPhases } from "../../contexs/orderPhases";
import { useOrderDetails } from "../../contexs/orderDetails";
import "./confirmation.module.style.css";

const Confirmation = () => {
  const { resetPhase } = useOrderPhases();
  const { resetOrder } = useOrderDetails();
  const [confirmationCode, setConfirmationCode] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post("http://localhost:3030/order");
        setConfirmationCode(data.orderNumber);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // axios
    //   .post("http://localhost:3030/order")
    //   .then((response) => {
    //     setConfirmationCode(response.data.orderNumber.toString());
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }, []);

  return (
    <div className="main">
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
