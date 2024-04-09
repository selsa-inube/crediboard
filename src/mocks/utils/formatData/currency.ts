const currencyFormat = (price: number): string => {
  if (price === 0) {
    return "$ 0";
  }

  return Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(price);
};

export { currencyFormat };
