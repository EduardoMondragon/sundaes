import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext();

// create custom hook to check whether we're in aprovider

export const useOrderDetails = () => {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from an OrderDetailsProvider"
    );
  }
  return contextValue;
};

export const OrderDetailsProvider = (props) => {
  // state
  const [optionsCounts, setOptionsCounts] = useState({
    scoops: {}, // example: {chocolate:1, vanilla:2}
    toppings: {}, // example: {gummy bears:1}
  });

  /**
   * SETER TO UPDATE THE STATE
   * @param {string} itemName example :chocolate or vanilla
   * @param {number} newItemCount example:  1 or 2 or more
   * @param {string} optionType example: toppings or scoops
   */
  const updateItemCount = (itemName, newItemCount, optionType) => {
    // make a copy of existing state
    const newOptionCounts = { ...optionsCounts };
    // update the copy with the incoming data
    newOptionCounts[optionType][itemName] = newItemCount;
    // update the state with the updated copy
    setOptionsCounts(newOptionCounts);
  };

  const resetOrder = () => {
    setOptionsCounts({
      scoops: {},
      toppings: {},
    });
  };

  // utility function to derive totals from optionCounts state value
  const calculateTotal = (optionType) => {
    // get an array of counts for the  option type example :[1,2]
    const countsArray = Object.values(optionsCounts[optionType]);
    // total the values in array of counts
    const totalCount = countsArray.reduce((total, value) => total + value, 0);
    // multiply the total of item by the price of that item type
    return totalCount * pricePerItem[optionType];
  };

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionsCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
};
