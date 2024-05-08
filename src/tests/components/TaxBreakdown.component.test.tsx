import { render, screen } from "@testing-library/react";
import { TaxBreakdown } from "@/components/custom/TaxBreakdown";
import { TaxBracket } from "@/types/TaxBracket";
import { APIError } from "@/classes/APIError";
import error_mapping from "@/data/error_mapping.json";

const ERROR_MAPPING = error_mapping as Record<string, string>;

const taxBrackets: TaxBracket[] = [
  { min: 0, max: 50197, rate: 0.15 },
  { min: 50197, max: 100392, rate: 0.205 },
  { min: 100392, max: 155625, rate: 0.26 },
  { min: 155625, max: 221708, rate: 0.29 },
  { min: 221708, rate: 0.33 },
];

describe("TaxBreakdown component", () => {
  it("renders taxes owed correctly", () => {
    const taxes = 12345.67;
    render(<TaxBreakdown taxes={taxes} fetching={false} error={null} taxBrackets={taxBrackets} />);
    const taxesOwed = screen.getByTestId("tax-breakdown-taxes");
    expect(taxesOwed).toBeInTheDocument();
    expect(taxesOwed).toHaveTextContent("$12,345.67");
  });

  it("renders tax brackets correctly when there is no error and not fetching", () => {
    render(<TaxBreakdown taxes={0} fetching={false} error={null} taxBrackets={taxBrackets} />);
    const taxBracketTable = screen.getByTestId("tax-bracket-table");
    const skeletonLoader = screen.queryByTestId("tax-bracket-table-skeleton");
    expect(taxBracketTable).toBeInTheDocument();
    expect(skeletonLoader).not.toBeInTheDocument();
  });

  it("renders error message correctly when there is an error", () => {
    const error: APIError = {
      errorCode: "INTERNAL_SERVER_ERROR",
      message: "Internal Server Error",
      statusCode: 500,
      name: "Internal Server Error",
    };
    render(<TaxBreakdown taxes={0} fetching={false} error={error} taxBrackets={taxBrackets} />);
    const errorMessage = screen.getByTestId("tax-breakdown-error");
    const taxBracketTable = screen.queryByTestId("tax-bracket-table");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(ERROR_MAPPING[error.errorCode]);
    expect(taxBracketTable).not.toBeInTheDocument();
  });

  it("renders skeleton loading state correctly when fetching", () => {
    render(<TaxBreakdown taxes={0} fetching={true} error={null} taxBrackets={taxBrackets} />);
    const skeletonLoader = screen.getByTestId("tax-bracket-table-skeleton");
    const taxBracketTable = screen.queryByTestId("tax-bracket-table");
    expect(skeletonLoader).toBeInTheDocument();
    expect(taxBracketTable).not.toBeInTheDocument();
  });
});
