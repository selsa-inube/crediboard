const currencyFormat = (price: number): string => {
  return Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

const parseCunstomFormat = (amount: string) => {
  const amountParsed = parseFloat(amount);
  return amount === "0" || !amountParsed  ? "$ 0" : currencyFormat(amountParsed);
}

export { currencyFormat, parseCunstomFormat };

