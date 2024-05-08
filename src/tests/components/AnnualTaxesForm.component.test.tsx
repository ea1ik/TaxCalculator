import { render, screen } from "@testing-library/react";
import { AnnualTaxesForm } from "@/components/custom/AnnualTaxesForm";
import { vitest } from "vitest";
import userEvent from "@testing-library/user-event";

describe("AnnualTaxesForm component", () => {
  const onSubmitMock = vitest.fn();
  const onYearChangeMock = vitest.fn();
  window.HTMLElement.prototype.scrollIntoView = vitest.fn();
  window.HTMLElement.prototype.hasPointerCapture = vitest.fn();
  window.HTMLElement.prototype.releasePointerCapture = vitest.fn();

  beforeEach(() => {
    onSubmitMock.mockClear();
    onYearChangeMock.mockClear();
    render(<AnnualTaxesForm onSubmit={onSubmitMock} onYearChange={onYearChangeMock} />);
  });

  it("renders form fields correctly", () => {
    const annualIncomeField = screen.getByTestId("annual-taxes-form-annual-income");
    const yearField = screen.getByTestId("annual-taxes-form-year");
    const calculateButton = screen.getByTestId("annual-taxes-form-submit-btn");
    const form = screen.getByTestId("annual-taxes-form");

    expect(annualIncomeField).toBeInTheDocument();
    expect(yearField).toBeInTheDocument();
    expect(calculateButton).toBeInTheDocument();
    expect(form).toBeInTheDocument();
  });

  it("calls onSubmit with form data when the form is submitted", async () => {
    const user = userEvent.setup();

    const annualIncomeField = screen.getByTestId("annual-taxes-form-annual-income");
    const yearField = screen.getByTestId("annual-taxes-form-year");
    const form = screen.getByTestId("annual-taxes-form");
    const calculateButton = screen.getByTestId("annual-taxes-form-submit-btn");

    expect(form).toHaveFormValues({ annualIncome: null, year: undefined });
    await user.type(annualIncomeField, "50000");
    expect(form).toHaveFormValues({ annualIncome: 50000 });

    await user.click(yearField);

    const yearOption = await screen.findByRole("option", { name: "2021" });
    expect(yearOption).toBeInTheDocument();

    await user.click(yearOption);
    await user.click(calculateButton);

    expect(onSubmitMock).toHaveBeenCalled();
    const formData = onSubmitMock.mock.calls[0][0];
    expect(formData).toEqual({ annualIncome: 50000, year: "2021" });
  });

  it("calls onYearChange when the year field is changed", async () => {
    const user = userEvent.setup();
    const yearField = screen.getByTestId("annual-taxes-form-year");
    await user.click(yearField);

    const yearOption = await screen.findByRole("option", { name: "2021" });
    expect(yearOption).toBeInTheDocument();

    await user.click(yearOption);

    expect(onYearChangeMock).toHaveBeenCalled();
    expect(onYearChangeMock).toHaveBeenCalledWith("2021");
  });

  it("displays disabled calculate button when form is not complete", async () => {
    const user = userEvent.setup();
    const calculateButton = screen.getByTestId("annual-taxes-form-submit-btn");

    expect(calculateButton).toBeDisabled();

    await user.click(calculateButton);

    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  it("does not allow the user to type non-int inputs in the annual salary field", async () => {
    const user = userEvent.setup();
    const annualIncomeField = screen.getByTestId("annual-taxes-form-annual-income");
    const calculateButton = screen.getByTestId("annual-taxes-form-submit-btn");
    const form = screen.getByTestId("annual-taxes-form");

    await user.type(annualIncomeField, "abc");
    expect(form).toHaveFormValues({ annualIncome: null });

    await user.click(calculateButton);

    expect(annualIncomeField).toHaveValue(null);
  });

  it("displays error message when annual income is negative", async () => {
    const user = userEvent.setup();
    const annualIncomeField = screen.getByTestId("annual-taxes-form-annual-income");
    const calculateButton = screen.getByTestId("annual-taxes-form-submit-btn");
    const form = screen.getByTestId("annual-taxes-form");

    await user.type(annualIncomeField, "-50000");
    expect(form).toHaveFormValues({ annualIncome: -50000 });

    await user.click(calculateButton);
    const message = screen.getByTestId("annual-taxes-form-annual-income-message");
    expect(message).toHaveTextContent("Income must be positive");
  });
});
