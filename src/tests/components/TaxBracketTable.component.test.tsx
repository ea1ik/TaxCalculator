import { render, screen } from "@testing-library/react";
import TaxBracketTable from "@/components/custom/TaxBracketTable";
import { describe, expect, it } from "vitest";
import formatter from "@/utils/formatter";

describe("Component testing of TaxBracketTable with data", () => {
  const taxBrackets = [
    { min: 0, max: 50197, rate: 0.15 },
    { min: 50197, max: 100392, rate: 0.205 },
    { min: 100392, max: 155625, rate: 0.26 },
    { min: 155625, max: 221708, rate: 0.29 },
    { min: 221708, rate: 0.33 },
  ];

  beforeEach(() => {
    render(<TaxBracketTable taxBrackets={taxBrackets} />);
  });

  it("renders the table with correct data", async () => {
    const table = screen.getByTestId("tax-bracket-table");
    expect(table).toBeInTheDocument();
  });

  it("renders the table with correct headers", async () => {
    const tableHeader = screen.getAllByTestId("tax-bracket-header");
    const headers = tableHeader[0].querySelectorAll("th");

    expect(headers).toHaveLength(3);

    const [min, max, rate] = headers;
    expect(min).toHaveTextContent("Min");
    expect(max).toHaveTextContent("Max");
    expect(rate).toHaveTextContent("Rate");
  });

  it("renders the table with the correct rows", async () => {
    const rows = screen.getAllByTestId("tax-bracket-row");

    for (const row of rows) {
      const cells = row.querySelectorAll("td");
      const [min, max, rate] = cells;
      const bracket = taxBrackets[rows.indexOf(row)];

      expect(min).toHaveTextContent(formatter.format(bracket.min));
      expect(max).toHaveTextContent(bracket.max ? formatter.format(bracket.max) : "-");
      expect(rate).toHaveTextContent(String(bracket.rate));
    }
  });

  it("renders the table with the correct number of rows", async () => {
    const rows = screen.getAllByTestId("tax-bracket-row");
    expect(rows).toHaveLength(taxBrackets.length);
  });

  it("renders the table with the correct number of columns", async () => {
    const rows = screen.getAllByTestId("tax-bracket-row");

    for (const row of rows) {
      const cells = row.querySelectorAll("td");
      expect(cells).toHaveLength(3);
    }
  });
});

describe("Component testing of TaxBracketTable with no data", () => {
  beforeEach(() => {
    render(<TaxBracketTable taxBrackets={[]} />);
  });

  it("renders the table with no data message", async () => {
    const table = screen.getByText("Select a year to view tax brackets");
    expect(table).toBeInTheDocument();
  });
});
