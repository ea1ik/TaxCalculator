import { useState } from "react";
import calculateTaxes from "./utils/calculateTaxes";
import useTaxBrackets from "./hooks/useTaxBrackets";
import { AnnualTaxesForm } from "./components/custom/AnnualTaxesForm";
import { TaxBreakdown } from "./components/custom/TaxBreakdown";

function App() {
  const [taxes, setTaxes] = useState<number>(0);
  const [year, setYear] = useState<string>("2022");
  const { taxBrackets, loading: fetching, error } = useTaxBrackets(year);

  const onSubmit = (data: { annualIncome: number; year: string }) => {
    if (!taxBrackets) return;
    const taxes = calculateTaxes(data.annualIncome, taxBrackets);
    setTaxes(taxes);
    setYear(data.year);
  };

  return (
    <div className="flex justify-center items-center flex-row gap-36 p-20">
      <section className="w-96 justify-center">
        <AnnualTaxesForm onSubmit={onSubmit} />
      </section>
      <section className="w-96">
        <TaxBreakdown error={error} fetching={fetching} taxes={taxes} taxBrackets={taxBrackets ?? []} />
      </section>
    </div>
  );
}

export default App;
