import { useState } from "react";
import { useOrderPhases } from "../../contexs/orderPhases";

const SummaryForm = () => {
  const { updatePhase } = useOrderPhases();
  const [ableToConfirm, setAbleToConfirm] = useState(false);
  const [termsAndConditionsVisible, setTermsAndConditionsVisible] =
    useState(false);

  const handleAcceptTermsAndConditions = (checked) => {
    setAbleToConfirm(checked);
  };

  const handleTermsAndConditionMessage = (hover) => {
    if (hover) {
      setTermsAndConditionsVisible(true);
    } else {
      setTermsAndConditionsVisible(false);
    }
  };

  const confirmOrder = () => {
    updatePhase("confirmation");
  };

  return (
    <div>
      <input
        type="checkbox"
        id="terms"
        name="terms"
        data-testid="checkbox"
        onClick={(e) => {
          handleAcceptTermsAndConditions(e.target.checked);
        }}
      />
      <label>
        {" "}
        I agree the{" "}
        <span
          data-testid="labelTerms"
          style={{ color: "orange", cursor: "pointer" }}
          onMouseOver={() => {
            handleTermsAndConditionMessage(true);
          }}
          onMouseLeave={() => {
            handleTermsAndConditionMessage(false);
          }}
        >
          terms and conditions
        </span>
      </label>
      {termsAndConditionsVisible && (
        <div
          style={{
            backgroundColor: "white",
            padding: 30,
            width: 250,
            height: 90,
            color: "black",
            marginLeft: 280,
            marginTop: -20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            position: "fixed",
          }}
        >
          <p>No ice cream will acutally delivered</p>
        </div>
      )}
      <br />
      <button
        disabled={!ableToConfirm}
        data-testid="confirmBtn"
        onClick={() => {
          confirmOrder();
        }}
      >
        Confirm Order
      </button>
    </div>
  );
};
export default SummaryForm;
