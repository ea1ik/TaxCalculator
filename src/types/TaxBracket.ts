/**
 * Represents a tax bracket.
 * @typedef {Object} TaxBracket
 * @property {number} [max] - The maximum income for this tax bracket.
 * @property {number} min - The minimum income for this tax bracket.
 * @property {number} rate - The tax rate for this tax bracket.
 */
export type TaxBracket = {
  max?: number;
  min: number;
  rate: number;
};
