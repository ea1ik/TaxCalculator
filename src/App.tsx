import { useState } from "react";
import calculateTaxes from "./utils/calculateTaxes";
import { z } from "zod";
import { tax_years } from "./data/tax_years.json";
import ERROR_MAPPING from "./data/error_mapping.json";
import { APIError } from "./classes/APIError";
import useTaxBrackets from "./hooks/useTaxBrackets";
import { Button } from "./components/ui/button";
import TaxBracketTable from "./components/custom/TaxBracketTable";

const error_mapping = ERROR_MAPPING as Record<string, string>;

const formSchema = z.object({
  annualIncome: z.number().nonnegative(),
  year: z.number().nonnegative().int(),
});

const defaultValues = formSchema.parse({
  annualIncome: 0,
  year: 2022,
});

function App() {
  const [taxes, setTaxes] = useState<number>(0);
  const [year, setYear] = useState<number>(defaultValues.year);
  const [calculating, setCalculating] = useState<boolean>(false);

  const { taxBrackets, loading, error } = useTaxBrackets(year);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!taxBrackets) return;
    setCalculating(true);
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const { annualIncome } = formSchema.parse({
        annualIncome: Number(formData.get("annualIncome")),
        year: Number(formData.get("year")),
      });

      const taxes = calculateTaxes(annualIncome, taxBrackets);
      setTaxes(taxes);
    } catch (error) {
      // form validation error
      if (error instanceof z.ZodError) {
        console.log(error_mapping[error.errors[0].code]);
      } else if (error instanceof APIError) {
        console.log(error_mapping[error.errorCode]);
      } else {
        console.log(error_mapping["null"]);
      }
    } finally {
      setCalculating(false);
    }
  };

  return (
    <div>
      <h1 className="font-thin">Calculate Taxes</h1>
      <div style={{ display: "flex", flexDirection: "row", width: 1000 }}>
        <section style={{ width: 400, justifyContent: "center" }}>
          <form onSubmit={onSubmit}>
            <div style={{ display: "flex" }}>
              <label style={{ flex: 1 }}>Year</label>
              <select
                style={{ flex: 2 }}
                name="year"
                id="year"
                defaultValue={defaultValues.year}
                onChange={(e) => {
                  setYear(parseInt(e.target.value));
                }}
              >
                {tax_years.map(({ year, disabled }) => (
                  <option disabled={disabled} key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex" }}>
              <label style={{ flex: 1 }} htmlFor="annualIncome">
                Annual Income
              </label>
              <input style={{ flex: 2 }} id="annualIncome" name="annualIncome" />
            </div>
            <Button variant="default">Calculate</Button>
          </form>
        </section>
        <section style={{ width: 400, height: 700, borderWidth: 1, borderColor: "black" }}>
          {calculating ? (
            <div>Calculating...</div>
          ) : error ? (
            <div>{error_mapping[error.errorCode]}</div>
          ) : loading ? (
            <div>Fetching...</div>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2>Taxes Owed</h2>
                <h3>{taxes}</h3>
              </div>
              <h2>Tax Brackets</h2>

              <TaxBracketTable taxBrackets={taxBrackets ?? []} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
