import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TaxBracket } from "@/types/TaxBracket";

type Props = {
  taxBrackets: TaxBracket[];
};

export default function TaxBracketTable({ taxBrackets }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Min</TableHead>
          <TableHead>Max</TableHead>
          <TableHead>Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {taxBrackets.map(({ min, max, rate }) => (
          <TableRow key={min}>
            <TableCell>{min}</TableCell>
            <TableCell>{max}</TableCell>
            <TableCell>{rate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
