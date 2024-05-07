import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import TaxBracketTableSkeleton from "@/components/custom/TaxBracketTableSkeleton";

describe("Component testing of TaxBracketTableSkeleton", () => {
  beforeEach(() => {
    render(<TaxBracketTableSkeleton />);
  });

  it("renders the table with skeleton", async () => {
    const table = screen.getByTestId("tax-bracket-table-skeleton");
    expect(table).toBeInTheDocument();
  });

  it("renders the table with correct headers", async () => {
    const tableHeader = screen.getAllByTestId("tax-bracket-table-skeleton-header");
    const headers = tableHeader[0].querySelectorAll("th");

    expect(headers).toHaveLength(3);

    const [min, max, rate] = headers;
    expect(min).toHaveTextContent("Min");
    expect(max).toHaveTextContent("Max");
    expect(rate).toHaveTextContent("Rate");
  });

  it("renders the table with correct number of skeletons", async () => {
    const skeletons = screen.getAllByTestId("tax-bracket-skeleton");
    expect(skeletons).toHaveLength(5);
  });
});
