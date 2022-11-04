import { render, screen } from "../../../test-utils/testing-libraries-utils";
import userEvent from "@testing-library/user-event";
import Options from "../options";

describe("ok", () => {
  it.only("update scoops subtotal when scoops change", async () => {
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
});
