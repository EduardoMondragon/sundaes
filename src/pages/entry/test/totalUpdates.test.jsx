import {
  findByText,
  render,
  screen,
} from "../../../test-utils/testing-libraries-utils";
import userEvent from "@testing-library/user-event";
import Options from "../options";

describe("assert initial and updated subtotals scoops and toppings", () => {
  it("[scoops] update subtotal when scoops amount change", async () => {
    render(<Options optionType="scoops" />);
    const user = userEvent.setup();

    // make sure total starts out $0.00
    const subtotalScoop = screen.getByText("scoops total :", { exact: false });
    expect(subtotalScoop).toHaveTextContent("0.00");

    // update vanilla scoops to 1  and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    expect(vanillaInput).toBeInTheDocument();
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(subtotalScoop).toHaveTextContent("2.00");

    // update the chocolate scoop to 2 and check subtotal
    const chocolateInput = await screen.findByRole("spinbutton", {
      name: "Chocolate",
    });
    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");
    expect(subtotalScoop).toHaveTextContent("6.00");
  });

  it("[toppings] update subtotal when toppings amount change", async () => {
    render(<Options optionType="toppings" />);
    const user = userEvent.setup();

    // make sure subtotal starts out $0.00
    const toppingsSubtotal = screen.getByText("toppings total :", {
      exact: false,
    });
    expect(toppingsSubtotal).toHaveTextContent("0.00");

    // select one topping and check the subtotal
    const toppingCheckbox = await screen.findByText("M&Ms");
    expect(toppingCheckbox).toBeInTheDocument();
    await user.click(toppingCheckbox);

    expect(toppingsSubtotal).toHaveTextContent("1.50");

    // select another topping and check the subtotal
    const gummiBearsToppingCheckbox = await screen.findByText("Hot fudge");
    expect(gummiBearsToppingCheckbox).toBeInTheDocument();
    await user.click(gummiBearsToppingCheckbox);

    expect(toppingsSubtotal).toHaveTextContent("3.00");

    // unselect one selected topping and check the subtotal
    await user.click(gummiBearsToppingCheckbox);
    expect(toppingsSubtotal).toHaveTextContent("1.50");
  });
});
