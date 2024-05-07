import { TaxBracket } from "../types/TaxBracket";
import apiFetch from "./apiFetch";

export default async function getBracketsByYear(year: string) {
  const { tax_brackets } = await apiFetch<{
    tax_brackets: TaxBracket[];
  }>({
    path: `/tax-calculator/tax-year/${year}`,
    method: "GET",
  });

  return tax_brackets;
}
