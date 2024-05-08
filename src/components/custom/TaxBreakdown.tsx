import { TaxBracket } from "@/types/TaxBracket";
import TaxBracketTable from "./TaxBracketTable";
import { APIError } from "@/classes/APIError";
import error_mapping from "@/data/error_mapping.json";
import formatter from "@/utils/formatter";
import TaxBracketTableSkeleton from "./TaxBracketTableSkeleton";
import { Skeleton } from "../ui/skeleton";

const ERROR_MAPPING = error_mapping as Record<string, string>;

type Props = {
  taxes: number;
  fetching: boolean;
  error: APIError | null;
  taxBrackets: TaxBracket[];
};

export function TaxBreakdown(props: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-6 justify-center items-center">
        <h2 className="text-sm">Taxes Owed</h2>
        {props.fetching ? (
          <Skeleton className="w-40 h-12" data-testid="tax-breakdown-taxes-skeleton" />
        ) : (
          <p className="text-4xl font-bold" data-testid="tax-breakdown-taxes">
            {formatter.format(props.taxes)}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <h2 className="text-sm">Tax Brackets</h2>
        {props.error ? (
          <p data-testid="tax-breakdown-error">{ERROR_MAPPING[props.error.errorCode]}</p>
        ) : props.fetching ? (
          <TaxBracketTableSkeleton />
        ) : (
          <TaxBracketTable taxBrackets={props.taxBrackets} />
        )}
      </div>
    </div>
  );
}
