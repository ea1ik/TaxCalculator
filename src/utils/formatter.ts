/**
 * The number formatter for currency values.
 */
const formatter = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
});

export default formatter;
