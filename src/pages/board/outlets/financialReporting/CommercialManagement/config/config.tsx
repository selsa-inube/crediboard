import { Text, Stack } from "@inube/design-system";

import { TableBoard } from "@components/data/TableBoard";

export const titlesCommercialManagementAccordeon = [
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

export const dataAccordeon = [
  {
    name: "Pagos Extra Pactados",
    title: (
      <Stack width="100%">
        <div style={{ flex: "1" }}>
          <Text type="label">Pagos Extra Pactados</Text>
        </div>
        <div style={{ flex: "1 1 1.5%" }}>
          <Text size="medium">$10.000.000</Text>
        </div>
        <div style={{ flex: "1 1 1.5%" }}>
          <Text size="medium">$0</Text>
        </div>
      </Stack>
    ),
    component: (
      <TableBoard
        id="dataAcordeon"
        titles={titlesCommercialManagementAccordeon}
        entries={entriesCommercialManagementAccordeon}
        efectzebra={false}
      />
    ),
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
    obligacion: <Text type="label">Número de Coutas</Text>,
    "Compra primera Vivienda": "24",
    "Libre Inversion": "24",
  },
  {
    id: "4",
    obligacion: <Text type="label">Número de Coutas</Text>,
    "Compra primera Vivienda": "24",
    "Libre Inversion": "24",
  },
];
