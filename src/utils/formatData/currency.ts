const currencyFormat = (price: number, withCurrencySymbol = true): string => {
  if (price === 0) {
    if (withCurrencySymbol) return "$ 0";
    return "0";
  }

  const value = Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);

  return withCurrencySymbol ? value : value.replace(/\$/g, "");
};

const parseCunstomFormat = (amount: string) => {
  const amountParsed = parseFloat(amount);
  return amount === "0" || !amountParsed  ? "$ 0" : currencyFormat(amountParsed);
}

export { currencyFormat, parseCunstomFormat };
