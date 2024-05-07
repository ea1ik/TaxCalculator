import calculateTaxes from "@/utils/calculateTaxes";
import { expect, it, describe } from "vitest";

const taxBrackets = [
  { min: 0, max: 50197, rate: 0.15 },
  { min: 50197, max: 100392, rate: 0.205 },
  { min: 100392, max: 155625, rate: 0.26 },
  { min: 155625, max: 221708, rate: 0.29 },
  { min: 221708, rate: 0.33 },
];

describe("calculateTaxes", () => {
  it("should calculate the taxes correctly", () => {
    const result = calculateTaxes(1000, taxBrackets);
    expect(result).toBe(150);
  });

  it("should return 0 when the annual income is 0", () => {
    const result = calculateTaxes(0, taxBrackets);
    expect(result).toBe(0);
  });

  it("should return 0 when the annual income is negative", () => {
    const result = calculateTaxes(-1000, taxBrackets);
    expect(result).toBe(0);
  });

  it("should return 0 when the annual income is not provided", () => {
    const result = calculateTaxes(undefined, taxBrackets);
    expect(result).toBe(0);
  });

  it("should calculate the taxes correctly when the annual income is in the first tax bracket", () => {
    const result = calculateTaxes(50000, taxBrackets);
    expect(result).toBeCloseTo(7500);
  });

  it("should calculate the taxes correctly when the annual income is in the second tax bracket", () => {
    const result = calculateTaxes(100000, taxBrackets);
    expect(result).toBeCloseTo(17739.17);
  });

  it("should calculate the taxes correctly when the annual income is in the fifth tax bracket", () => {
    const result = calculateTaxes(1234567, taxBrackets);
    expect(result).toBeCloseTo(385587.645);
  });
});
