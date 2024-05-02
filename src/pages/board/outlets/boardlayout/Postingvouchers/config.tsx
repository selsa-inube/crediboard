import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inube/design-system";

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

export const titlesPostingvouchers = [
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
    id: "verImagen",
    titleName: "Ver Imagen",
    priority: 3,
  },
];

export const entriesPostingvouchers = [
  {
    id: "1",
    "No. de Obligación": "1234554545",
    "No. de Documento": "NC - 9876543210",
    "Ver Imagen": (
      <Icon
        icon={<MdOutlineRemoveRedEye />}
        appearance="primary"
        onClick={entrySelection}
        spacing="none"
        size="24px"
        cursorHover
      />
    ),
  },
  {
    id: "2",
    "No. de Obligación": "1234567890",
    "No. de Documento": "NC - 9876556789",
    "Ver Imagen": "",
  },
  {
    id: "3",
    "No. de Obligación": "1234564321",
    "No. de Documento": "OP - 3456789123",
    "Ver Imagen": "",
  },
];
