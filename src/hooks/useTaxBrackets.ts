import { useQuery } from "@tanstack/react-query";
import { TaxBracket } from "../types/TaxBracket";
import getBracketsByYear from "../api/getBracketsByYear";
import { APIError } from "../classes/APIError";

const useTaxBrackets = (year: string | null) => {
  const {
    data: taxBrackets,
    error,
    isLoading,
  } = useQuery<TaxBracket[], APIError>({
    queryKey: year ? ["brackets", year] : ["brackets"],
    queryFn: year ? () => getBracketsByYear(year) : () => Promise.resolve([]),
  });

  return { taxBrackets, error, loading: isLoading };
};

export default useTaxBrackets;
