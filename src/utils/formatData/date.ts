function formatISODatetoCustomFormat(isoDateString: string): string {
  const date = new Date(isoDateString);
  const day = date.getDate().toString().padStart(2, "0");
  const months = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2); 

  return `${day}/${month}/${year}`;
}

function formatDateWithFullYear(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const months = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  const month =
    months[date.getMonth()].charAt(0).toUpperCase() +
    months[date.getMonth()].slice(1); 
  const year = date.getFullYear(); 

  return `${day}/${month}/${year}`;
}

function isValidDate(value: string): boolean {
  return /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/.test(value);
}

const formatPrimaryDate = (date: Date, withTime?: boolean): string => {
  const months = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear().toString().slice(-2);
  if (withTime) {
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${day}/${month}/${year} - ${hours}:${minutes} ${ampm}`;
  } else {
    return `${day}/${month}/${year}`;
  }
};

export {
  formatISODatetoCustomFormat,
  formatDateWithFullYear,
  isValidDate,
  formatPrimaryDate,
};
