import { isValidElement } from "react";
import {
  MdOutlineSend,
  MdOutlineRemoveRedEye,
  MdCheck,
  MdRemove,
  MdClose,
} from "react-icons/md";
import { Icon } from "@inubekit/icon";

import { Tag } from "@components/data/Tag";
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
    id: "tag",
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
    tag: <Tag label="En tramite" appearance="warning" />,
  },
  {
    id: "2",
    "No. de Obligación": "1234567890",
    "No. de Documento": "1234567890",
    Tipo: "Pagare",
    tag: <Tag label="Firmado" appearance="success" />,
  },
  {
    id: "3",
    "No. de Obligación": "1234564321",
    "No. de Documento": "1234567890",
    Tipo: "Libranza",
    tag: <Tag label="Con Error" appearance="danger" />,
  },
];

export const actionsFinanacialReporting = [
  {
    id: "Reenviar",
    actionName: "Reenviar",
    content: (data: IEntries) => (
      <Icon
        appearance="primary"
        cursorHover
        size="22px"
        variant="none"
        icon={<MdOutlineSend />}
        onClick={() => entrySelection(data)}
        spacing="none"
      />
    ),
  },
  {
    id: "ver imagen",
    actionName: "Ver Imagen",
    content: (data: IEntries) => (
      <Icon
        appearance="primary"
        size="22px"
        spacing="none"
        variant="none"
        cursorHover
        icon={<MdOutlineRemoveRedEye />}
        onClick={() => entrySelection(data)}
      />
    ),
  },
];

const iconActionsMobile = (tag: string) => {
  if (tag === "Aprobado") {
    return <MdCheck />;
  } else if (tag === "Pendiente") {
    return <MdRemove />;
  } else {
    return <MdClose />;
  }
};

interface TagProps {
  appearance?: string;
  label?: string;
}

interface TagElement {
  props: TagProps;
}

const isValidTagElement = (element: unknown): element is TagElement => {
  return isValidElement(element) && element.props !== undefined;
};

export const actionMobile = [
  {
    id: "tags",
    actionName: "",
    content: (data: IEntries) => (
      <Icon
        icon={
          isValidElement(data?.tag) &&
          iconActionsMobile(data?.tag?.props?.label)
        }
        appearance={
          isValidTagElement(data?.tag)
            ? data?.tag?.props?.appearance
            : undefined
        }
        spacing="none"
        cursorHover
        variant="filled"
        shape="circle"
      />
    ),
  },
  {
    id: "Reenviar",
    actionName: "Reenviar",
    content: (data: IEntries) => (
      <Icon
        appearance="primary"
        size="22px"
        spacing="none"
        cursorHover
        icon={<MdOutlineSend />}
        onClick={() => entrySelection(data)}
      />
    ),
  },
  {
    id: "ver imagen",
    actionName: "Ver Imagen",
    content: (data: IEntries) => (
      <Icon
        appearance="primary"
        size="22px"
        spacing="none"
        cursorHover
        icon={<MdOutlineRemoveRedEye />}
        onClick={() => entrySelection(data)}
      />
    ),
  },
];

export const getTableBoardActions = (entrySelection: (data: IEntries) => void) => 
  actionsFinanacialReporting.map((action) => ({
    id: action.id,
    actionName: action.actionName,
    label: "Action Label",
    content: (data: IEntries) => (
      <div onClick={() => entrySelection(data)}>
        {action.content(data)}
      </div>
    ),
  }));

export const getTableBoardActionMobile = (entrySelection: (data: IEntries) => void) => 
  actionMobile.map((action) => ({
    id: action.id,
    actionName: action.actionName,
    label: "Mobile Action Label",
    content: (data: IEntries) => (
      <div onClick={() => entrySelection(data)}>
        {action.content(data)}
      </div>
    ),
  }));
