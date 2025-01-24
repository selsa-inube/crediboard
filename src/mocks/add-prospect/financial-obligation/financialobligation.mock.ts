import { IFinancialObligation } from "@components/modals/ReportCreditsModal/config";

export const mockFinancialObligation: IFinancialObligation[] = [
  {
    id: "1001",
    type: "Consumo",
    balance: 10000000,
    fee: 600000,
    entity: "Bancolombia",
    payment: "Caja",
    idUser: "12546",
    feePaid: "5/60",
    actions: "",
  },
  {
    id: "1002",
    type: "Tarjeta",
    balance: 2000000,
    fee: 300000,
    entity: "Falabella",
    payment: "Caja",
    idUser: "3524",
    feePaid: "10/40",
    actions: "",
  },
  {
    id: "1003",
    type: "Vivienda",
    balance: 50000000,
    fee: 1000000,
    entity: "Davivienda",
    payment: "Caja",
    idUser: "4721",
    feePaid: "12/60",
    actions: "",
  },
  {
    id: "1004",
    type: "Vehículo",
    balance: 20000000,
    fee: 900000,
    entity: "Finandina",
    payment: "Caja",
    idUser: "-",
    feePaid: "-",
    actions: "",
  },
  {
    id: "1005",
    type: "Otros",
    balance: 5000000,
    fee: 500000,
    entity: "Propio",
    payment: "Nómina conv.",
    idUser: "-",
    feePaid: "-",
    actions: "",
  },
];
