import { TaxBracket } from "../types/TaxBracket";
import apiFetch from "./apiFetch";

export default async function getBrackets() {
  try {
    const { tax_brackets } = await apiFetch<{
      tax_brackets: TaxBracket[];
    }>({
      path: "/tax-calculator/",
      method: "GET",
    });

    return tax_brackets;
  } catch (error) {
    console.error("[ERROR]", error);
    throw error;
  }
}
