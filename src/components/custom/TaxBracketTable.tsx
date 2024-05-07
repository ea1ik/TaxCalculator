import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TaxBracket } from "@/types/TaxBracket";
import formatter from "@/utils/formatter";

type Props = {
  taxBrackets: TaxBracket[];
};

export default function TaxBracketTable({ taxBrackets }: Props) {
  return (
    <Table className="w-96" data-testid="tax-bracket-table">
      <TableHeader data-testid="tax-bracket-header">
        <TableRow>
          <TableHead>Min</TableHead>
          <TableHead>Max</TableHead>
          <TableHead>Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {taxBrackets.map(({ min, max, rate }) => (
          <TableRow key={min} data-testid="tax-bracket-row">
            <TableCell>{formatter.format(min)}</TableCell>
            <TableCell>{max ? formatter.format(max) : "-"}</TableCell>
            <TableCell>{rate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
