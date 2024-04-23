import { MdOutlineSend, MdOutlineRemoveRedEye } from "react-icons/md";

import { Icon, Tag } from "@inube/design-system";
const resiveData = (e: React.ChangeEvent) => {
  console.log(e, "function que recibe data");
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
      <div style={{ display: "flex", justifyContent: "center", width: "90px" }}>
        <Icon
          icon={<MdOutlineRemoveRedEye />}
          appearance="primary"
          onClick={resiveData}
          spacing="compact"
          size="16px"
          cursorHover
        />
      </div>
    ),
  },
  {
    id: "2",
    "No. de Obligación": "1234567890",
    "No. de Documento": "1234567890",
    Tipo: "Pagare",
    tag: <Tag label="Firmado" appearance="success" />,
    Reenviar: (
      <div style={{ display: "flex", justifyContent: "center", width: "60px" }}>
        <Icon
          icon={<MdOutlineSend />}
          appearance="primary"
          spacing="compact"
          cursorHoverh
          size="16px"
          onClick={resiveData.bind(this)}
        />
      </div>
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
