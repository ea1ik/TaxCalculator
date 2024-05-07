import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TaxBracketTableSkeleton() {
  return (
    <div className="flex flex-col w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Min</TableHead>
            <TableHead>Max</TableHead>
            <TableHead>Rate</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <div className="flex flex-col gap-1.5">
        <Skeleton className="w-auto h-12" />
        <Skeleton className="w-auto h-12" />
        <Skeleton className="w-auto h-12" />
        <Skeleton className="w-auto h-12" />
        <Skeleton className="w-auto h-12" />
      </div>
    </div>
  );
}
