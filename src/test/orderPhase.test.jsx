import {
  logRoles,
  render,
  screen,
  waitFor,
} from "../test-utils/testing-libraries-utils";
import userEvent from "@testing-library/user-event";
import App from "../App";

const checkLoadingPageIsDisplaying = async () => {
  const loadingTitle = screen.getByRole("heading", {
    name: /loading/i,
    exact: false,
  });
  expect(loadingTitle).toBeInTheDocument();
  await new Promise((r) => setTimeout(r, 1600));
  expect(loadingTitle).not.toBeInTheDocument();
};

describe("happy path", () => {
  it("order phase for happy path", async () => {
    const user = userEvent.setup();
    render(<App></App>);

    // expect to see loading page
    await checkLoadingPageIsDisplaying();

    // add ice cream scoops and toppings

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });

    expect(vanillaInput).toBeInTheDocument();
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    expect(chocolateInput).toBeInTheDocument();
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");

    const toppingOptionMMs = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    expect(toppingOptionMMs).toBeInTheDocument();
    await user.click(toppingOptionMMs);

    //  find and click order button

    const buttonOrderSundae = screen.getByRole("button", {
      name: /order sundae/i,
    });

    expect(buttonOrderSundae).toBeInTheDocument();
    await user.click(buttonOrderSundae);

    await checkLoadingPageIsDisplaying();

    //  check summary information based on order

    const summaryTitle = screen.getByRole("heading", {
      name: "Order Summary",
      exact: false,
    });

    expect(summaryTitle).toBeInTheDocument();

    const total = screen.getByRole("heading", { name: /total :/i });
    expect(total).toHaveTextContent("7.50");

    expect(screen.getByRole("heading", { name: /Scoops/i })).toHaveTextContent(
      "6.00"
    );
    expect(
      screen.getByRole("heading", { name: /Toppings/i })
    ).toHaveTextContent("1.50");
    // screen.debug();

    // accept terms and conditions and click button to confirm order
    const checkboxTerms = screen.getByRole("checkbox");
    expect(checkboxTerms).toBeInTheDocument();
    await user.click(checkboxTerms);

    const confirmBtn = screen.getByRole("button", { name: /confirm order/i });
    expect(confirmBtn).toBeEnabled();
    await user.click(confirmBtn);

    await checkLoadingPageIsDisplaying();
    // confirm order number on\ confirmation page
    const thanksTitle = screen.getByRole("heading", { name: /thanks/i });
    expect(thanksTitle).toBeInTheDocument();

    const orderNumer = await screen.findByRole("heading", {
      name: /your order confirmation number is/i,
    });
    expect(orderNumer).toBeInTheDocument();
    expect(orderNumer).toHaveTextContent("9741592006");
    // screen.debug();

    //  click New order button on confirmation page
    const newSundaeButton = screen.getByRole("button", {
      name: "order new sundae",
    });
    await user.click(newSundaeButton);
    await checkLoadingPageIsDisplaying();
    // check the scoops and toppings subtotals have been reset
    const subtotalScoops = screen.getByRole("heading", {
      name: /scoops total/i,
    });
    const subtotalToppings = screen.getByRole("heading", {
      name: /toppings total/i,
    });
    expect(subtotalScoops).toHaveTextContent("0.00");
    expect(subtotalToppings).toHaveTextContent("0.00");
    // do we need to await anything to avoid test erros ?
  }, 60_000);
});
