import { render } from "@testing-library/react";
import { OrderPhasesProvider } from "../contexs/orderPhases";
import { OrderDetailsProvider } from "../contexs/orderDetails";

const AllTheProviders = ({ children }) => {
  return (
    <OrderPhasesProvider>
      <OrderDetailsProvider>{children}</OrderDetailsProvider>
    </OrderPhasesProvider>
  );
};

const renderWithContex = (ui, options) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });

// re export everything
export * from "@testing-library/react";

// override render method
export { renderWithContex as render };
