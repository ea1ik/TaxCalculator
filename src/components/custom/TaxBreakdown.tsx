import { TaxBracket } from "@/types/TaxBracket";
import TaxBracketTable from "./TaxBracketTable";
import { APIError } from "@/classes/APIError";
import ERROR_MAPPING from "@/data/error_mapping.json";

type Props = {
  taxes: number;
  fetching: boolean;
  error: APIError | null;
  taxBrackets: TaxBracket[];
};

const error_mapping = ERROR_MAPPING as Record<string, string>;

export function TaxBreakdown(props: Props) {
  return (
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
        <h3>{props.taxes}</h3>
      </div>
      <h2>Tax Brackets</h2>

      {props.error ? <div>{error_mapping[props.error.message]}</div> : null}

      {props.fetching ? <div>Fetching...</div> : <TaxBracketTable taxBrackets={props.taxBrackets} />}
    </div>
  );
}
