export interface dataTableExtraDebtors {
  id: string;
  docType: string;
  docNumber: string;
  name: string;
  lastName: string;
  income: string;
  expenses: string;
  email: string;
  phoneNumber: string;
  actions: string;
  gender: string;
}

export const headers: {
  label: string;
  key: keyof dataTableExtraDebtors;
  action?: boolean;
}[] = [
  { label: "Tipo de documento", key: "docType" },
  { label: "Numero de documento", key: "docNumber" },
  { label: "Nombres", key: "name" },
  { label: "Apellidos", key: "lastName" },
  { label: "Ingresos", key: "income" },
  { label: "Egresos", key: "expenses" },
  // { label: "Email ", key: "email" },
  // { label: "Número de teléfono ", key: "phoneNumber" },
  // { label: "Genero ", key: "gender" },
  // { label: "Fecha de nacimiento", key: "date" },
  { label: "Acciones", key: "actions", action: true },
];

export const dataReport = {
  noData:
    "Aún no hay adeudores extra registrados. Presione “Agregar deudor extra” para empezar.",
};
