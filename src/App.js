import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./contexs/orderDetails";
import Loading from "./pages/loading/loading";
import OrderEntry from "./pages/entry/orderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import Confirmation from "./pages/confirmation/confirmation";
import { useOrderPhases } from "./contexs/orderPhases";

function App() {
  const { phase, updatePhase, loading } = useOrderPhases();

  const currentPhaseComponent = (currentPhase) => {
    switch (currentPhase) {
      case "inProgress":
        return <OrderEntry />;
      case "orderSummary":
        return <OrderSummary />;
      case "confirmation":
        return <Confirmation />;
      default:
        updatePhase("inProgress");
        return <OrderEntry />;
    }
  };

  return (
    <Container style={{ padding: "40px" }}>
      <OrderDetailsProvider>
        {loading ? (
          <Loading />
        ) : (
          phase !== undefined && currentPhaseComponent(phase)
        )}
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
