import { TaxBracket } from "../types/TaxBracket";

/**
 * Calculates the taxes owed based on the annual income and tax brackets.
 *
 * @param annualIncome - The annual income of the individual.
 * @param taxBrackets - An array of tax brackets containing the minimum, maximum, and rate for each bracket.
 * @returns The amount of taxes owed.
 */
const calculateTaxes = (annualIncome: number | undefined | null, taxBrackets: TaxBracket[]) => {
  // in case the annual income is not provided or is negative, return 0
  if (!annualIncome || annualIncome <= 0) return 0;

  let taxes = 0;
  let remainingIncome = annualIncome;

  // iterate through the tax brackets and calculate the taxes owed
  for (let i = 0; i < taxBrackets.length; i++) {
    const taxBracket = taxBrackets[i];

    // calculate the taxes owed for the current tax bracket
    const taxableIncome = taxBracket.max ? Math.min(remainingIncome, taxBracket.max - taxBracket.min) : remainingIncome;

    // add the taxes owed for the current tax bracket to the total taxes
    taxes += taxableIncome * taxBracket.rate;

    // update the remaining income
    remainingIncome -= taxableIncome;

    // if there is no remaining income, break out of the loop
    if (remainingIncome <= 0) break;
  }
  return taxes;
};

export default calculateTaxes;
