function formatISODatetoCustomFormat(isoDateString: string) {
  const date = new Date(isoDateString);
  const day = date.getDate();
  const month = date.toLocaleString("es-CO", { month: "long" });
  const year = date.getFullYear().toString().slice(-2);

  return `${month} ${day}/${year}`;
}

function formatDateWithFullYear(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("es-CO", { month: "long" });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();

  return `${capitalizedMonth} ${day} / ${year}`;
}

export { formatISODatetoCustomFormat, formatDateWithFullYear };
