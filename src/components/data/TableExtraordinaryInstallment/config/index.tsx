import { currencyFormat } from "@src/utils/formatData/currency";
import { Detail } from "../Detail";
import { IHeaders } from "../../../../pages/prospect/components/ExtraordinaryPaymentModal/types";

export const rowsVisbleMobile = [
    "datePayment",
    "value",
    "actions",
];

export const rowsActions = [
    {
        label: "Acciones",
        key: "actions",
        container: () => {
            return(
                <Detail  />
            )
        }
        ,
    },
];

export const headersTableExtraordinaryInstallment: IHeaders[] = [
    {
        label: "Fecha de pago",
        key: "datePayment",
    },
    {
        label: "Valor",
        key: "value",
        mask: (value: string|number)=>{
            return currencyFormat(value as number);
        }
    },
    {
        label: "Medio de pago",
        key: "paymentMethod",
    },
];


export const pageLength = 5;