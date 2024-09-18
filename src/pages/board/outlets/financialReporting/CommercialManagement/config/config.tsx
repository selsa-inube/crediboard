import {
  MdOutlinePayments,
  MdOutlineMonetizationOn,
  MdOutlineBalance,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { Text, Stack } from "@inube/design-system";

import { TableBoard } from "@components/data/TableBoard";
import { Schedule } from "@services/enums";

export const titlesCommercialManagementAccordion = [
  {
    id: "obligacion",
    titleName: "",
    priority: 1,
  },
  {
    id: "Compra primera Vivienda",
    titleName: "",
    priority: 2,
  },
  {
    id: "Libre Inversion",
    titleName: "",
    priority: 3,
  },
];

export const titlesCommercialManagement = [
  {
    id: "obligacion",
    titleName: "",
    priority: 1,
  },
  {
    id: "Compra primera Vivienda",
    titleName: "Compra primera Vivienda",
    priority: 2,
  },
  {
    id: "Libre Inversion",
    titleName: "Libre Inversion",
    priority: 3,
  },
];

export const entriesCommercialManagementAccordeon = [
  {
    id: "1",
    obligacion: (
      <Stack gap="20px">
        <Text type="label">Junio 30/2023</Text>
        <Text type="label">Nómina</Text>
      </Stack>
    ),
    "Compra primera Vivienda": "$1.500.000",
    "Libre Inversion": "",
  },
  {
    id: "2",
    obligacion: (
      <Stack gap="20px">
        <Text type="label">Junio 30/2023</Text>
        <Text type="label">Nómina</Text>
      </Stack>
    ),
    "Compra primera Vivienda": "$1.000.000",
    "Libre Inversion": "",
  },
  {
    id: "3",
    obligacion: (
      <Stack gap="20px">
        <Text type="label">Junio 30/2023</Text>
        <Text type="label">Nómina</Text>
      </Stack>
    ),
    "Compra primera Vivienda": "$1.000.000",
    "Libre Inversion": "",
  },
];

export const entriesAppliedDiscounts = [
  {
    id: "1",
    obligacion: (
      <Stack gap="20px">
        <Text type="label">Intereces de Ajuste al Ciclo</Text>
      </Stack>
    ),
    "Compra primera Vivienda": "$150.000",
    "Libre Inversion": "",
  },
  {
    id: "2",
    obligacion: (
      <Stack gap="20px">
        <Text type="label">Seguro de Cartera</Text>
      </Stack>
    ),
    "Compra primera Vivienda": "$20.000",
    "Libre Inversion": "",
  },
  {
    id: "3",
    obligacion: (
      <Stack gap="20px">
        <Text type="label">Comisión por Fianza</Text>
      </Stack>
    ),
    "Compra primera Vivienda": "$-",
    "Libre Inversion": "",
  },
];

export const entriesCreditsCollected = [
  {
    id: "1",
    obligacion: (
      <Stack gap="20px">
        <Text type="label">Neto a Girar</Text>
      </Stack>
    ),
    "Compra primera Vivienda": "$49.500.000",
    "Libre Inversion": "$5.200.000",
  },
];

export const dataAccordeon = [
  {
    name: "Pagos Extra Pactados",
    title: (
      <Stack width="100%">
        <div style={{ flex: "1" }}>
          <Text type="label">Pagos Extra Pactados</Text>
        </div>
        <div style={{ flex: "1 1 3.5%" }}>
          <Text size="medium">$10.000.000</Text>
        </div>
        <div style={{ flex: "1 1 2.5%" }}>
          <Text size="medium">$0</Text>
        </div>
      </Stack>
    ),
    content: (
      <TableBoard
        id="dataAcordeon"
        titles={titlesCommercialManagementAccordion}
        entries={entriesCommercialManagementAccordeon}
        appearanceTable={{
          title: "dark",
          efectzebra: false,
          borderTable: true,
          background: true,
          widthTd: "190px",
        }}
      />
    ),
  },
  {
    name: "Descuentos Aplicados",
    title: (
      <Stack width="100%">
        <div style={{ flex: "1" }}>
          <Text type="label">Descuentos Aplicados</Text>
        </div>
        <div style={{ flex: "1 1 3.5%" }}>
          <Text size="medium">$49.500.000</Text>
        </div>
        <div style={{ flex: "1 1 2.5%" }}>
          <Text size="medium">$50.000</Text>
        </div>
      </Stack>
    ),
    content: (
      <TableBoard
        id="Descuentos"
        titles={titlesCommercialManagementAccordion}
        entries={entriesAppliedDiscounts}
        appearanceTable={{
          title: "dark",
          efectzebra: false,
          borderTable: true,
          background: true,
          widthTd: "190px",
        }}
      />
    ),
  },
  {
    name: "Creditos Recogidos",
    title: (
      <Stack width="100%">
        <div style={{ flex: "1" }}>
          <Text type="label">Créditos Recogidos</Text>
        </div>
        <div style={{ flex: "1 1 3.5%" }}>
          <Text size="medium">$49.500.000</Text>
        </div>
        <div style={{ flex: "1 1 2.5%" }}>
          <Text size="medium">$50.000</Text>
        </div>
      </Stack>
    ),
    content: (
      <TableBoard
        id="dataAcordeon"
        titles={titlesCommercialManagementAccordion}
        entries={entriesCreditsCollected}
        appearanceTable={{
          title: "dark",
          efectzebra: false,
          borderTable: false,
          background: false,
          widthTd: "190px",
        }}
      />
    ),
  },
];

export const titlesCommercialManagementPRueba = [
  {
    id: "obligacion",
    titleName: "",
    priority: 1,
  },
  {
    id: "Compra primera Vivienda",
    titleName: "Compra primera Vivienda",
    priority: 2,
  },
  {
    id: "Libre Inversion",
    titleName: "Libre Inversión",
    priority: 3,
  },
];

export const entriesCommercialManagement = [
  {
    id: "1",
    obligacion: <Text type="label">Medio de Pago</Text>,
    "Compra primera Vivienda": "Nómina",
    "Libre Inversion": "Nómina",
  },
  {
    id: "2",
    obligacion: <Text type="label">Tpo de Garantía</Text>,
    "Compra primera Vivienda": "Hipoteca",
    "Libre Inversion": "Sin Garantía",
  },
  {
    id: "3",
    obligacion: <Text type="label">Monto del Crédito</Text>,
    "Compra primera Vivienda": "$50.000.000",
    "Libre Inversion": "$5.250.000",
  },
  {
    id: "4",
    obligacion: <Text type="label">Número de Coutas</Text>,
    "Compra primera Vivienda": "24",
    "Libre Inversion": "24",
  },
  {
    id: "5",
    obligacion: <Text type="label">Valor de la Couta</Text>,
    "Compra primera Vivienda": "$1.120.000",
    "Libre Inversion": "$200.000",
  },
];

export const entriesCommercialManagementCard = [
  {
    lineOfCredit: "Crédito Vacacional",
    paymentMethod: "Nómina mensual éxito Bancolombia",
    loanAmount: 100000000,
    interestRate: 123456789012,
    termMonths: 48,
    periodicFee: 1000,
    schedule: Schedule.Biweekly,
  },
  {
    lineOfCredit: "Crédito Vehículo",
    paymentMethod: "Nómina mensual éxito",
    loanAmount: 100000000,
    interestRate: 123456789012,
    termMonths: 48,
    periodicFee: 1000,
    schedule: Schedule.Biweekly,
  },
  {
    lineOfCredit: "Crédito Libre Inversión",
    paymentMethod: "Nómina mensual éxito Bancolombia",
    loanAmount: 100000000,
    interestRate: 123456789012,
    termMonths: 48,
    periodicFee: 1000,
    schedule: Schedule.Biweekly,
  },
  {
    lineOfCredit: "Crédito Educativo",
    paymentMethod: "Nómina mensual éxito",
    loanAmount: 100000000,
    interestRate: 123456789012,
    termMonths: 48,
    periodicFee: 1000,
    schedule: Schedule.Biweekly,
  },
  {
    lineOfCredit: "Crédito Rotativo",
    paymentMethod: "Nómina mensual éxito Bancolombia",
    loanAmount: 100000000,
    interestRate: 123456789012,
    termMonths: 48,
    periodicFee: 1000,
    schedule: Schedule.Biweekly,
  },
  {
    lineOfCredit: "Crédito Libre Inversión",
    paymentMethod: "Nómina mensual éxito",
    loanAmount: 100000000,
    interestRate: 123456789012,
    termMonths: 48,
    periodicFee: 1000,
    schedule: Schedule.Biweekly,
  },
  {
    lineOfCredit: "Crédito Educativo",
    paymentMethod: "Nómina mensual éxito Bancolombia",
    loanAmount: 100000000,
    interestRate: 123456789012,
    termMonths: 48,
    periodicFee: 1000,
    schedule: Schedule.Biweekly,
  },
  {
    lineOfCredit: "Crédito Rotativo",
    paymentMethod: "Nómina mensual éxito",
    loanAmount: 100000000,
    interestRate: 123456789012,
    termMonths: 48,
    periodicFee: 1000,
    schedule: Schedule.Biweekly,
  },
];

export const SummaryProspectCredit = [
  {
    item: [{ title: "Obligaciones recogidas", amount: "5000000" }],
    iconEdit: true,
  },
  {
    item: [
      { title: "Monto prestamo", amount: "16000000" },
      { title: "Obligaciones recogidas", amount: "5000000" },
      { title: "Gastos decontables", amount: "1000000" },
      { title: "Neto a girar", amount: "10000000" },
      { title: "Cuota ordinaria", amount: "1200000" },
    ],
    iconEdit: false,
  },
];

export const menuOptions = [
  {
    title: "Origen de cupo",
    onClik: () => {},
    icon: <MdOutlineBalance />,
  },
  {
    title: "Fuentes de ingreso",
    onClik: () => {},
    icon: <MdOutlineAccountBalanceWallet />,
  },
  {
    title: "Obligaciones financieras",
    onClik: () => {},
    icon: <MdOutlineMonetizationOn />,
  },
  {
    title: "Pagos extras",
    onClik: () => {},
    icon: <MdOutlinePayments />,
  },
];
