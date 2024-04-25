function formatISODatetoCustomFormat(isoDateString: string) {
  const date = new Date(isoDateString);
  const day = date.getDate();
  const month = date.toLocaleString("es-CO", { month: "long" });
  const year = date.getFullYear().toString().slice(-2);

  return `${month} ${day}/${year}`;
}

export { formatISODatetoCustomFormat };
