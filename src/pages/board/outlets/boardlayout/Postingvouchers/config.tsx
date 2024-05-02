import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon } from "@inube/design-system";

const entrySelection = (e: React.ChangeEvent<HTMLButtonElement>) => {
  const padre = e.target.closest("tr");

  const tdElements = padre?.querySelectorAll("td")[0].textContent?.trim();

  const data = entriesPostingvouchers.find(
    (entry) => entry["No. de Obligación"] === tdElements
  );
  return data;
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
