import { MdOutlineSend, MdOutlineRemoveRedEye } from "react-icons/md";
import { Icon, Tag } from "@inube/design-system";

import { IEntries } from "@components/data/TableBoard/types";

const entrySelection = (data: IEntries) => {
  console.log(data);
};

export const titlesFinanacialReporting = [
  {
    id: "No. de Obligación",
    titleName: "No. de Obligación",
    priority: 1,
  },
  {
    id: "No. de Documento",
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
];

export const entriesFinanacialReporting = [
  {
    id: "1",
    "No. de Obligación": "1234554545",
    "No. de Documento": "1234567890",
    Tipo: "Pagare",
    Estado: <Tag label="En tramite" appearance="warning" />,
  },
  {
    id: "2",
    "No. de Obligación": "1234567890",
    "No. de Documento": "1234567890",
    Tipo: "Pagare",
    Estado: <Tag label="Firmado" appearance="success" />,
  },
  {
    id: "3",
    "No. de Obligación": "1234564321",
    "No. de Documento": "1234567890",
    Tipo: "Libranza",
    Estado: <Tag label="Con Error" appearance="error" />,
  },
];

export const actionsFinanacialReporting = [
  {
    id: "ver imagen",
    actionName: "Ver Imagen",
    content: (data: IEntries) => (
      <Icon
        appearance="primary"
        size="24px"
        cursorHover
        icon={<MdOutlineRemoveRedEye />}
        onClick={() => entrySelection(data)}
      />
    ),
  },
  {
    id: "enviar",
    actionName: "Enviar",
    content: (data: IEntries) => (
      <Icon
        appearance="primary"
        cursorHover
        size="24px"
        icon={<MdOutlineSend />}
        onClick={() => entrySelection(data)}
      />
    ),
  },
];
