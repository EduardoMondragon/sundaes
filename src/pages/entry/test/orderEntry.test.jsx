import { render, screen, waitFor } from "@testing-library/react";
import OrderEntry from "../orderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
describe("handles errors scoops and topic ", () => {
  it.only("handles errors for scoops and topic server endpoints", async () => {
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
