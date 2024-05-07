import { TaxBracket } from "@/types/TaxBracket";
import TaxBracketTable from "./TaxBracketTable";
import { APIError } from "@/classes/APIError";
import error_mapping from "@/data/error_mapping.json";
import formatter from "@/utils/formatter";

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
      <div className="flex flex-col my-10">
        <h2 className="text-sm">Taxes Owed</h2>
        <p className="text-4xl font-bold">{formatter.format(props.taxes)}</p>
      </div>
      <div className="flex flex-col w-full h-96">
        <h2 className="text-base">Tax Brackets</h2>
        {props.error ? (
          <div>{ERROR_MAPPING[props.error.errorCode]}</div>
        ) : props.fetching ? (
          <div>Fetching...</div>
        ) : (
          <TaxBracketTable taxBrackets={props.taxBrackets} />
        )}
      </div>
    </div>
  );
}
