interface RowData {
  type: string;
  balance: string;
  fee: string;
  entity: string;
  payment: string;
  height: string;
  actions: string;
  id: string;
}

export const headers: {
  label: string;
  key: keyof RowData;
  action?: boolean;
}[] = [
  { label: "Tipo", key: "type" },
  { label: "Saldo", key: "balance" },
  { label: "Cuota", key: "fee" },
  { label: "Entidad", key: "entity" },
  { label: "Medio-pago", key: "payment" },
  { label: "Id", key: "id" },
  { label: "Altura", key: "height" },
  { label: "Acciones", key: "actions", action: true },
];

export const data: RowData[] = [
  {
    type: "Consumo",
    balance: "10.000.000",
    fee: "600.000",
    entity: "Bancolombia",
    payment: "Caja",
    id: "12546",
    height: "5/60",
    actions: "",
  },
  {
    type: "Tarjeta",
    balance: "2.000.000",
    fee: "300.000",
    entity: "Falabella",
    payment: "Caja",
    id: "3524",
    height: "10/40",
    actions: "",
  },
  {
    type: "Vivienda",
    balance: "50.000.000",
    fee: "1.000.000",
    entity: "Davivienda",
    payment: "Caja",
    id: "4721",
    height: "12/60",
    actions: "",
  },
  {
    type: "Vehículo",
    balance: "20.000.000",
    fee: "900.000",
    entity: "Finandina",
    payment: "Caja",
    id: "-",
    height: "-",
    actions: "",
  },
  {
    type: "Otros",
    balance: "5.000.000",
    fee: "500.000",
    entity: "Propio",
    payment: "Nómina conv.",
    id: "-",
    height: "-",
    actions: "",
  },
];

export const dataReport = {
    title: "Obligaciones financieras",
    close: "Cerrar",
    addObligations: "Agregar obligaciones",
    noData: "¡Ups! No se encontraron obligaciones financieras vigentes.",
    totalFee: "Cuota Total",
    totalBalance: "Saldo Total"
}