import { screen, render } from "@testing-library/react";
import Options from "../options";
import { OrderDetailsProvider } from "../../../contexs/orderDetails";

describe("first try mock service worker", () => {
  it("display images for each scoop option from the server", async () => {
    render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(3);

    // confirm alt text image
    const altTexImages = scoopImages.map((item) => item.alt);
    expect(altTexImages).toEqual([
      "Chocolate scoop",
      "Vanilla scoop",
      "Mint chip scoop",
    ]);
  });

  it("display images for each topping option from the server", async () => {
    render(<Options optionType="toppings" />, {
      wrapper: OrderDetailsProvider,
    });

    const toppingsImages = await screen.findAllByRole("img", {
      name: /topping$/i,
    });
    expect(toppingsImages).toHaveLength(3);

    const toppingsAltText = toppingsImages.map((item) => item.alt);
    expect(toppingsAltText).toEqual([
      "M&Ms topping",
      "Hot fudge topping",
      "Peanut butter cups topping",
    ]);
  });
});
