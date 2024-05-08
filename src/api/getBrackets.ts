import { TaxBracket } from "../types/TaxBracket";
import apiFetch from "./apiFetch";

/**
 * Fetches the tax brackets from the API.
 * @returns An array of tax brackets.
 */
export default async function getBrackets() {
  const { tax_brackets } = await apiFetch<{
    tax_brackets: TaxBracket[];
  }>({
    path: "/tax-calculator/",
    method: "GET",
  });

  return tax_brackets;
}
