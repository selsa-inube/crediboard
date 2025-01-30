import { currencyFormat } from "@utils/formatData/currency";
import { IHeaders } from "@components/modals/ExtraordinaryPaymentModal/types";

import { Detail } from "../Detail";

export const rowsVisbleMobile = ["datePayment", "value", "actions"];

export const rowsActions = [
  {
    label: "Acciones",
    key: "actions",
    container: () => {
      return <Detail />;
    },
  },
];

export const headersTableExtraordinaryInstallment: IHeaders[] = [
  {
    label: "Fecha",
    key: "datePayment",
  },
  {
    label: "Valor",
    key: "value",
    mask: (value: string | number) => {
      return currencyFormat(value as number);
    },
  },
  {
    label: "Medio de pago",
    key: "paymentMethod",
  },
];

export const pageLength = 5;
