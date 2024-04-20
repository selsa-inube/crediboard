const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function formatISODatetoCustomFormat(isoDateString: string) {
  const date = new Date(isoDateString);
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  return `${month} ${day}/${year}`;
}

export { formatISODatetoCustomFormat };
