import { createContext, useContext, useState } from "react";

const OrderPhases = createContext();

/**
 * custom hook to get and update the current phase
 * @param {any} props
 */
export const useOrderPhases = (props) => {
  const contextValue = useContext(OrderPhases);
  if (!contextValue) {
    throw new Error(
      "useOrderPhases must be called from OrderPhasesProvider, pilas paps"
    );
  }
  return contextValue;
};

export const OrderPhasesProvider = (props) => {
  const [phase, setPhase] = useState(null);
  const [loading, setLoading] = useState(false);

  const updatePhase = (incomingPhase) => {
    setLoading(true);
    setPhase(incomingPhase);
    setTimeout(async () => {
      setLoading(false);
    }, 1500);
  };

  const resetPhase = () => {
    setPhase(null);
  };
  const value = { phase, updatePhase, resetPhase, loading };

  return <OrderPhases.Provider value={value} {...props}></OrderPhases.Provider>;
};
