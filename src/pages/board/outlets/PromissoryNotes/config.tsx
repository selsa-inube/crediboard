import { MdOutlineSend, MdOutlineRemoveRedEye } from "react-icons/md";

import { Icon, Tag, Stack } from "@inube/design-system";

const entrySelection = (e: React.ChangeEvent<HTMLButtonElement>) => {
  const padre = e.target.closest("tr");
  const tdElements = padre?.querySelectorAll("td");

  const rowData: { [key: string]: string | undefined } = {};

  tdElements?.forEach((td, index) => {
    const value = td?.textContent?.trim();

    switch (index) {
      case 0:
        rowData.id = value;
        break;
      case 1:
        rowData["No. de Obligación"] = value;
        break;
      case 2:
        rowData["No. de Documento"] = value;
        break;
      case 3:
        rowData.Tipo = value;
        break;
    }
  });

  return rowData;
};

export const titlesFinanacialReporting = [
  {
    id: "numObligacion",
    titleName: "No. de Obligación",
    priority: 1,
  },
  {
    id: "numDocumento",
    titleName: "No. de Documento",
    priority: 2,
  },
  {
    id: "Tipo",
    titleName: "Tipo",
    priority: 3,
  },
  {
    id: "Estado",
    titleName: "Estado",
    priority: 4,
  },
  {
    id: "Reenviar",
    titleName: "Reenviar",
    priority: 5,
  },
  {
    id: "VerImagen",
    titleName: "Ver Imagen",
    priority: 6,
  },
];

export const entriesFinanacialReporting = [
  {
    id: "1",
    "No. de Obligación": "1234554545",
    "No. de Documento": "1234567890",
    Tipo: "Pagare",
    tag: <Tag label="En tramite" appearance="warning" />,
    Reenviar: "",
    "Ver Imagen": (
      <Stack
        direction="column"
        display="flex"
        justifyContent="center"
        width="60px"
      >
        <Icon
          icon={<MdOutlineRemoveRedEye />}
          appearance="primary"
          onClick={entrySelection}
          spacing="compact"
          size="24px"
          cursorHover
        />
      </Stack>
    ),
  },
  {
    id: "2",
    "No. de Obligación": "1234567890",
    "No. de Documento": "1234567890",
    Tipo: "Pagare",
    tag: <Tag label="Firmado" appearance="success" />,
    Reenviar: (
      <Stack
        direction="column"
        display="flex"
        justifyContent="center"
        width="60px"
      >
        <Icon
          icon={<MdOutlineSend />}
          appearance="primary"
          spacing="compact"
          cursorHover
          size="24px"
          onClick={entrySelection}
        />
      </Stack>
    ),
    "Ver Imagen": "",
  },
  {
    id: "3",
    "No. de Obligación": "1234564321",
    "No. de Documento": "1234567890",
    Tipo: "Libranza",
    tag: <Tag label="Con Error" appearance="error" />,
    Reenviar: "",
    "Ver Imagen": "",
  },
];
