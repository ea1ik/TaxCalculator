import { TaxBracket } from "../types/TaxBracket";
import apiFetch from "./apiFetch";

/**
 * Retrieves the tax brackets for a specific year.
 * @param year - The year for which to retrieve the tax brackets.
 * @returns An array of tax brackets for the specified year.
 */
export default async function getBracketsByYear(year: string) {
  const { tax_brackets } = await apiFetch<{
    tax_brackets: TaxBracket[];
  }>({
    path: `/tax-calculator/tax-year/${year}`,
    method: "GET",
  });

  return tax_brackets;
}
