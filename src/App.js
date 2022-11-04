import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexs/orderDetails";
import OrderEntry from "./pages/entry/orderEntry";

function App() {
  return (
    <Container style={{ padding: "40px" }}>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
