import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TaxBracketTableSkeleton() {
  return (
    <div className="flex flex-col w-96" data-testid="tax-bracket-table-skeleton">
      <Table>
        <TableHeader data-testid="tax-bracket-table-skeleton-header">
          <TableRow>
            <TableHead>Min</TableHead>
            <TableHead>Max</TableHead>
            <TableHead>Rate</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div className="flex flex-col gap-1.5">
        <Skeleton data-testid="tax-bracket-skeleton" className="h-12" />
        <Skeleton data-testid="tax-bracket-skeleton" className="h-12" />
        <Skeleton data-testid="tax-bracket-skeleton" className="h-12" />
        <Skeleton data-testid="tax-bracket-skeleton" className="h-12" />
        <Skeleton data-testid="tax-bracket-skeleton" className="h-12" />
      </div>
    </div>
  );
}
