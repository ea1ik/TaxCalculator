import { useEffect, useState } from "react";
import calculateTaxes from "./utils/calculateTaxes";
import useTaxBrackets from "./hooks/useTaxBrackets";
import { AnnualTaxesForm } from "./components/custom/AnnualTaxesForm";
import { TaxBreakdown } from "./components/custom/TaxBreakdown";

function App() {
  const [taxes, setTaxes] = useState<number>(0);
  const [annualIncome, setAnnualIncome] = useState<number>(0);
  const [year, setYear] = useState<string | null>(null);
  const { taxBrackets, loading: fetching, error } = useTaxBrackets(year);

  useEffect(() => {
    if (annualIncome) {
      if (!taxBrackets) return;
      const taxes = calculateTaxes(annualIncome, taxBrackets);
      setTaxes(taxes);
    }
  }, [taxBrackets, annualIncome]);

  const onSubmit = (data: { annualIncome: number; year: string }) => {
    if (!taxBrackets) return;
    setAnnualIncome(data.annualIncome);
    const taxes = calculateTaxes(data.annualIncome, taxBrackets);
    setTaxes(taxes);
    setYear(data.year);
  };

  return (
    <div className="flex justify-center items-center flex-col p-20">
      <h1 className="text-4xl font-extrabold my-10">Tax Calculator</h1>
      <div className="flex flex-row gap-36 px-20">
        <section className="flex items-center justify-center min-w-96">
          <AnnualTaxesForm onYearChange={setYear} onSubmit={onSubmit} />
        </section>
        <section className="flex items-center justify-center">
          <TaxBreakdown error={error} fetching={fetching} taxes={taxes} taxBrackets={taxBrackets ?? []} />
        </section>
      </div>
    </div>
  );
}

export default App;
