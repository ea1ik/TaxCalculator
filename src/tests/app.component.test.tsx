import { render } from "@testing-library/react";
import TaxBracketTable from "@/components/custom/TaxBracketTable";
import { describe, expect, it } from "vitest";

const taxBrackets = [
  { min: 0, max: 50197, rate: 0.15 },
  { min: 50197, max: 100392, rate: 0.205 },
  { min: 100392, max: 155625, rate: 0.26 },
  { min: 155625, max: 221708, rate: 0.29 },
  { min: 221708, rate: 0.33 },
];

describe("TaxBracketTable", () => {
  it("renders the table with correct data", () => {
    const { getByText } = render(<TaxBracketTable taxBrackets={taxBrackets} />);

    // Check if the table headers are rendered correctly
    expect(getByText("Min")).toBeInTheDocument();
    expect(getByText("Max")).toBeInTheDocument();
    expect(getByText("Rate")).toBeInTheDocument();

    // Check if the table rows are rendered correctly
    taxBrackets.forEach(({ min, max, rate }) => {
      expect(getByText(min.toString())).toBeInTheDocument();
      expect(getByText(max ? max.toString() : "-")).toBeInTheDocument();
      expect(getByText(rate.toString())).toBeInTheDocument();
    });
  });
});
