import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AnnualTaxesForm } from "@/components/custom/AnnualTaxesForm";
import { vitest } from "vitest";

describe("AnnualTaxesForm component", () => {
  const onSubmitMock = vitest.fn();
  const onYearChangeMock = vitest.fn();

  beforeEach(() => {
    onSubmitMock.mockClear();
    onYearChangeMock.mockClear();
  });

  it("renders form fields correctly", () => {
    render(<AnnualTaxesForm onSubmit={onSubmitMock} onYearChange={onYearChangeMock} />);

    const annualIncomeField = screen.getByTestId("annual-taxes-form-annual-income");
    const yearField = screen.getByTestId("annual-taxes-form-year");
    const calculateButton = screen.getByTestId("annual-taxes-form-submit-btn");

    expect(annualIncomeField).toBeInTheDocument();
    expect(yearField).toBeInTheDocument();
    expect(calculateButton).toBeInTheDocument();
  });

  it("calls onSubmit with form data when the form is submitted", () => {
    render(<AnnualTaxesForm onSubmit={onSubmitMock} onYearChange={onYearChangeMock} />);

    const annualIncomeField = screen.getByTestId("annual-taxes-form-annual-income");
    const yearField = screen.getByTestId("annual-taxes-form-year");
    const calculateButton = screen.getByTestId("annual-taxes-form-submit-btn");

    fireEvent.change(annualIncomeField, { target: { value: "50000" } });
    fireEvent.change(yearField, { target: { value: "2022" } });
    fireEvent.click(calculateButton);

    waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
      expect(onSubmitMock).toHaveBeenCalledWith({ annualIncome: 50000, year: "2022" });
    });
  });

  it("calls onYearChange when the year field is changed", () => {
    render(<AnnualTaxesForm onSubmit={onSubmitMock} onYearChange={onYearChangeMock} />);

    const yearField = screen.getByTestId("annual-taxes-form-year");

    fireEvent.change(yearField, { target: { value: "2021" } });

    waitFor(() => {
      expect(onYearChangeMock).toHaveBeenCalled();
      expect(onYearChangeMock).toHaveBeenCalledWith("2021");
    });
  });

  it("displays required error message when annual income is not provided", () => {
    render(<AnnualTaxesForm onSubmit={onSubmitMock} onYearChange={onYearChangeMock} />);

    const calculateButton = screen.getByTestId("annual-taxes-form-submit-btn");

    fireEvent.click(calculateButton);

    waitFor(() => {
      const errorMessage = screen.queryByTestId("annual-taxes-form-annual-income-message");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Annual income is required");
    });
  });

  it("displays error message when annual income is not a number", () => {
    render(<AnnualTaxesForm onSubmit={onSubmitMock} onYearChange={onYearChangeMock} />);

    const annualIncomeField = screen.getByTestId("annual-taxes-form-annual-income");
    const calculateButton = screen.getByTestId("annual-taxes-form-submit-btn");

    fireEvent.change(annualIncomeField, { target: { value: "abc" } });
    fireEvent.click(calculateButton);

    waitFor(() => {
      const errorMessage = screen.queryByTestId("annual-taxes-form-annual-income-message");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Annual income must be a number");
    });
  });

  it("displays error message when annual income is negative", () => {
    render(<AnnualTaxesForm onSubmit={onSubmitMock} onYearChange={onYearChangeMock} />);

    const annualIncomeField = screen.getByTestId("annual-taxes-form-annual-income");
    const calculateButton = screen.getByTestId("annual-taxes-form-submit-btn");

    fireEvent.change(annualIncomeField, { target: { value: "-50000" } });
    fireEvent.click(calculateButton);

    waitFor(() => {
      const errorMessage = screen.queryByTestId("annual-taxes-form-annual-income-message");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent("Annual income must be greater than zero");
    });
  });
});
