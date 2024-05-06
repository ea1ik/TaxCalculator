import { TaxBracket } from "../types/TaxBracket";

const calculateTaxes = (annualIncome: number, taxBrackets: TaxBracket[]) => {
  if (annualIncome <= 0 || !annualIncome) return 0;
  let taxes = 0;
  let remainingIncome = annualIncome;
  for (let i = 0; i < taxBrackets.length; i++) {
    const taxBracket = taxBrackets[i];
    const taxableIncome = taxBracket.max ? Math.min(remainingIncome, taxBracket.max - taxBracket.min) : remainingIncome;
    taxes += taxableIncome * taxBracket.rate;
    remainingIncome -= taxableIncome;
    if (remainingIncome <= 0) {
      break;
    }
  }
  return taxes;
};

export default calculateTaxes;
