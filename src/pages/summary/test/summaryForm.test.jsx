import { render, screen } from "../../../test-utils/testing-libraries-utils";
import SummaryForm from "../summaryForm";
import userEvent from "@testing-library/user-event";

describe("check inital elements", () => {
  let user;
  beforeEach(async () => {
    render(<SummaryForm />);
    user = userEvent.setup();
  });
  it("confirm button should be disable  when checkbox is unchecked", async () => {
    const checkBoxElement = screen.getByTestId("checkbox");
    const confirmButtonElement = screen.getByTestId("confirmBtn");

    expect(checkBoxElement).not.toBeChecked();
    expect(confirmButtonElement).toBeDisabled();
  });

  it("confirm button should be enable  when checkbox is unchecked", async () => {
    const checkBoxElement = screen.getByTestId("checkbox");
    const confirmButtonElement = screen.getByTestId("confirmBtn");

    await user.click(checkBoxElement);
    expect(checkBoxElement).toBeChecked();
    expect(confirmButtonElement).toBeEnabled();
  });

  it("popover response the hover", async () => {
    // pop over star hided
    const nullPopOverElement = screen.queryByText(
      /No ice cream will acutally delivered/i
    );
    expect(nullPopOverElement).not.toBeInTheDocument();

    // popover apears when mouse is over the checkbox terms and conditions message
    const labelTermsElement = screen.getByTestId("labelTerms");
    expect(labelTermsElement).toBeInTheDocument();

    await user.hover(labelTermsElement);

    const popOverElement = screen.getByText(
      /No ice cream will acutally delivered/i
    );
    expect(popOverElement).toBeInTheDocument();

    await user.unhover(labelTermsElement);
    expect(popOverElement).not.toBeInTheDocument();
  });
});
