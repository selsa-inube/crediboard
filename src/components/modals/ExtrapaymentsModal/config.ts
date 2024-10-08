interface RowData {
  date: string;
  balance: string;
  fee: string;
  actions: string;
  id: string;
}

export const headers: {
  label: string;
  key: keyof RowData;
  action?: boolean;
}[] = [
  { label: "Fecha", key: "date" },
  { label: "Valor", key: "balance" },
  { label: "Medio de pago", key: "fee" },
  { label: "Acciones", key: "actions", action: true },
];

export const data: RowData[] = [
  {
    date: "Mar 25-26",
    balance: "10.000.000",
    fee: "Selsa",
    id: "12546",
    actions: "",
  },
  {
    date: "Abr 25-26",
    balance: "2.000.000",
    fee: "Selsa",
    id: "3524",
    actions: "",
  },
  {
    date: "Jun 30-26",
    balance: "50.000.000",
    fee: "Prima",
    id: "4721",
    actions: "",
  },
  {
    date: "Ene 31-27",
    balance: "20.000.000",
    fee: "Cesantías",
    id: "-",
    actions: "",
  },
  {
    date: "Ene 31-27",
    balance: "20.000.000",
    fee: "Cesantías",
    id: "-",
    actions: "",
  },
  {
    date: "Ene 31-27",
    balance: "20.000.000",
    fee: "Cesantías",
    id: "-",
    actions: "",
  },
  {
    date: "Ene 31-27",
    balance: "20.000.000",
    fee: "Cesantías",
    id: "-",
    actions: "",
  },
  {
    date: "Ene 31-27",
    balance: "20.000.000",
    fee: "Cesantías",
    id: "-",
    actions: "",
  },
];

export const dataReport = {
  title: "pagos extras",
  close: "Cerrar",
  addObligations: "Agregar serie",
  noData: "¡Ups! No se encontraron pagos extras",
};
