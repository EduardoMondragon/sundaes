import { render, screen } from "../../../test-utils/testing-libraries-utils";
import Confirmation from "../confirmation";
import userEvent from "@testing-library/user-event";

describe("CONFIRMATION TEST", () => {
  let userAction;
  beforeEach(() => {
    render(<Confirmation />);
    userAction = userEvent.setup();
  });

  it("should check if ordernumber is in the document", async () => {
    const title = screen.getByRole("heading", { name: /Thanks/i });
    expect(title).toBeInTheDocument();

    const orderNumer = await screen.findByRole("heading", {
      name: /confirmation number/i,
    });
    expect(orderNumer).toBeInTheDocument();
    expect(orderNumer).toHaveTextContent("9741592006");

    const orderNewSundaeButton = screen.getByRole("button", {
      name: /order/i,
      exact: false,
    });
    expect(orderNewSundaeButton).toBeInTheDocument();
    await userAction.click(orderNewSundaeButton);
  });
});
