import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TAX_YEARS from "@/data/tax_years.json";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  annualIncome: z.number().nonnegative(),
  year: z.enum(TAX_YEARS.map((item) => item.year) as [string]),
});

type Props = {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onYearChange?: (year: string) => void;
};

export function AnnualTaxesForm(props: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: "2022",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(props.onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="annualIncome"
          render={({ field }) => {
            return (
              <FormItem onChange={(e) => field.onChange(parseInt((e.target as HTMLInputElement).value))}>
                <FormLabel>Annual Income</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Your total income for the year</FormDescription>
                <FormMessage />
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
              <FormControl>
                <Select defaultValue={form.formState.defaultValues?.year}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TAX_YEARS.map((item) => (
                      <SelectItem key={item.year} value={item.year} disabled={item.disabled}>
                        {item.year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Calculate Taxes</Button>
      </form>
    </Form>
  );
}
