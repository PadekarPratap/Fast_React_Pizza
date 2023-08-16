export const currencyUnit = (value, curr) => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: curr,
  }).format(value);
};
