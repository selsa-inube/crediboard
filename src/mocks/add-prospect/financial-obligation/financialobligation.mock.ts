import { IFinancialObligation } from "@components/modals/ReportCreditsModal/config";

export const mockFinancialObligation: IFinancialObligation[] = [
  {
    type: "Consumo",
    balance: 10000000,
    fee: 600000,
    entity: "Bancolombia",
    payment: "Caja",
    id: "12546",
    height: "5/60",
    actions: "",
  },
  {
    type: "Tarjeta",
    balance: 2000000,
    fee: 300000,
    entity: "Falabella",
    payment: "Caja",
    id: "3524",
    height: "10/40",
    actions: "",
  },
  {
    type: "Vivienda",
    balance: 50000000,
    fee: 1000000,
    entity: "Davivienda",
    payment: "Caja",
    id: "4721",
    height: "12/60",
    actions: "",
  },
  {
    type: "Vehículo",
    balance: 20000000,
    fee: 900000,
    entity: "Finandina",
    payment: "Caja",
    id: "-",
    height: "-",
    actions: "",
  },
  {
    type: "Otros",
    balance: 5000000,
    fee: 500000,
    entity: "Propio",
    payment: "Nómina conv.",
    id: "-",
    height: "-",
    actions: "",
  },
];
