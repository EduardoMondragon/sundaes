import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-libraries-utils";
import OrderEntry from "../orderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import { OrderDetailsProvider } from "../../../contexs/orderDetails";
describe("handles errors scoops and toppings", () => {
  it("handles errors for scoops and topic server endpoints", async () => {
    // =============
    server.resetHandlers(
      rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
        res(ctx.status(500))
      ),
      rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    // ============
    render(<OrderEntry />);
    await waitFor(async () => {
      const alerts = await screen.findAllByRole("alert");
      expect(alerts).toHaveLength(2);
    });
  });
});
