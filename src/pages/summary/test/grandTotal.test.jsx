import { screen, render } from "../../../test-utils/testing-libraries-utils";
import OrderEntry from "../../entry/orderEntry";
import userEvent from "@testing-library/user-event";
// import { logRoles } from "@testing-library/dom";
// import Options from "../../entry/options";
describe("GRAND TOTAL", () => {
  let user;
  beforeEach(async () => {
    render(<OrderEntry />);
    user = userEvent.setup();
  });

  const selectScoop = async (scoop, items) => {
    const scoopOption = await screen.findByRole("spinbutton", {
      name: scoop,
    });
    expect(scoopOption).toBeInTheDocument();
    await user.clear(scoopOption);
    await user.type(scoopOption, items.toString());
  };

  const selectTopping = async (topping) => {
    const toppingOption = await screen.findByRole("checkbox", {
      name: topping,
    });
    expect(toppingOption).toBeInTheDocument();
    await user.click(toppingOption);
  };

  //   it("grand total should start at $0.00", async () => {
  //     // const { container } = render(<GrandTotal />);
  //     // logRoles(container);
  //   });

  it("grand total should update propertly if select scoops before toppings", async () => {
    const grandTotalElement = screen.getByRole("heading", {
      name: /grand total : /i,
    });
    expect(grandTotalElement).toBeInTheDocument();
    expect(grandTotalElement).toHaveTextContent("0.00");
    // select one scoop
    await selectScoop("Chocolate", 1);
    // check if scoope value were added to the grand total , should be $2.00
    expect(grandTotalElement).toBeInTheDocument();
    expect(grandTotalElement).toHaveTextContent("2.00");
  });

  it("grand total should update propertly if select toppings before scoops", async () => {
    // select one scoop
    await selectTopping("Hot fudge");
    // check if scoope value were added to the grand total , should be $2.00
    const grandTotalElement = screen.getByRole("heading", {
      name: /grand total : /i,
    });
    expect(grandTotalElement).toBeInTheDocument();
    expect(grandTotalElement).toHaveTextContent("1.50");
  });
  it("grand total should update propertly if an item is removed", async () => {
    // select 2 vanilla scoop
    await selectScoop("Vanilla", 2);
    await selectTopping("Hot fudge");
    const grandTotalElement = screen.getByRole("heading", {
      name: /grand total : /i,
    });
    expect(grandTotalElement).toBeInTheDocument();
    expect(grandTotalElement).toHaveTextContent("5.50");

    // remove one scoope
    await selectScoop("Vanilla", 1);
    expect(grandTotalElement).toHaveTextContent("3.50");

    // remove one topping
    await selectTopping("Hot fudge");
    expect(grandTotalElement).toHaveTextContent("2.00");
  });

  it("order sundae button should be disabled if any scoop has not been selected", async () => {
    const grandTotal = await screen.findByRole("heading", {
      name: /grand total/i,
    });
    expect(grandTotal).toBeInTheDocument();
    expect(grandTotal).toHaveTextContent("0.00");

    const orderSundaeButton = screen.getByRole("button", {
      name: /order sundae/i,
    });
    expect(orderSundaeButton).toHaveStyle({ "background-color": "gray" });
    expect(orderSundaeButton).toBeDisabled();
  });

  it("order sundae button should be enabled if any scoop has been selected", async () => {
    const grandTotal = await screen.findByRole("heading", {
      name: /grand total/i,
    });
    expect(grandTotal).toBeInTheDocument();
    expect(grandTotal).toHaveTextContent("0.00");

    const orderSundaeButton = screen.getByRole("button", {
      name: /order sundae/i,
    });
    expect(orderSundaeButton).toBeDisabled();

    await selectScoop("Mint chip", 1);
    expect(grandTotal).toHaveTextContent("2.00");
    expect(orderSundaeButton).toBeEnabled();
  });
});
