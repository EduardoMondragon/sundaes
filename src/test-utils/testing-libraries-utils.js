import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../contexs/orderDetails";

const renderWithContex = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re export everything
export * from "@testing-library/react";

// override render method
export { renderWithContex as render };
