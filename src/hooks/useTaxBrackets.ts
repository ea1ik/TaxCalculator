import { useQuery } from "@tanstack/react-query";
import { TaxBracket } from "../types/TaxBracket";
import getBracketsByYear from "../api/getBracketsByYear";
import { APIError } from "../classes/APIError";

/**
 * Custom hook to fetch tax brackets based on the specified year.
 *
 * @param year - The year for which to fetch the tax brackets.
 * @returns An object containing the fetched tax brackets, error, and loading state.
 */
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
