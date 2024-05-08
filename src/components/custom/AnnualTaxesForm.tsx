import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TAX_YEARS from "@/data/tax_years.json";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  annualIncome: z.coerce
    .number({ message: "Income must be a number" })
    .nonnegative({ message: "Income must be positive" }),
  year: z.enum(TAX_YEARS.map((item) => item.year) as [string]),
});

type Props = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onYearChange?: (year: string) => void;
};

export function AnnualTaxesForm(props: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { year: "2022", annualIncome: 0 },
  });

  return (
    <Form {...form} data-testid="annual-taxes-form">
      <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="annualIncome"
          rules={{ required: "Annual income is required" }}
          render={({ field }) => {
            return (
              <FormItem className="w-full" onChange={field.onChange}>
                <FormLabel>Annual Income</FormLabel>
                <FormControl data-testid="annual-taxes-form-annual-income">
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>Your total income for the year</FormDescription>
                <FormMessage data-testid="annual-taxes-form-annual-income-message" />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem
              onChange={(e) => {
                field.onChange((e.target as HTMLInputElement).value);
                props.onYearChange?.((e.target as HTMLInputElement).value);
              }}
            >
              <FormLabel>Annual Tax Year</FormLabel>
              <Select defaultValue={field.value}>
                <FormControl data-testid="annual-taxes-form-year">
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TAX_YEARS.map((item) => (
                    <SelectItem key={item.year} value={item.year} disabled={item.disabled}>
                      {item.year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>The year of taxation</FormDescription>
            </FormItem>
          )}
        />
        <Button data-testid="annual-taxes-form-submit-btn" className="w-full" type="submit">
          Calculate Taxes
        </Button>
      </form>
    </Form>
  );
}
