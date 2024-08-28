import React from "react";
import {
  MdOutlineSend,
  MdOutlineRemoveRedEye,
  MdCheck,
  MdRemove,
  MdClose,
} from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { IEntries } from "@components/data/TableBoard/types";

const entrySelection = (data: IEntries, actionId: string) => {
  console.log(data, actionId);
};

export const titlesFinanacialReporting = [
  { id: "No. de Obligación", titleName: "No. de Obligación", priority: 1 },
  { id: "No. de Documento", titleName: "No. de Documento", priority: 2 },
  { id: "Tipo", titleName: "Tipo", priority: 3 },
  { id: "tag", titleName: "Estado", priority: 4 },
];

export const actionsFinanacialReporting = [
  {
    id: "Reenviar",
    actionName: "Reenviar",
    content: (data: IEntries, actionId: string) => (
      <Icon
        appearance="primary"
        cursorHover
        size="22px"
        variant="none"
        icon={<MdOutlineSend />}
        onClick={() => entrySelection(data, actionId)}
        spacing="none"
      />
    ),
  },
  {
    id: "ver imagen",
    actionName: "Ver Imagen",
    content: (data: IEntries, actionId: string) => (
      <Icon
        appearance="primary"
        size="22px"
        spacing="none"
        variant="none"
        cursorHover
        icon={<MdOutlineRemoveRedEye />}
        onClick={() => entrySelection(data, actionId)}
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

export const infoItems = [
  { icon: <MdOutlineSend />, text: "Reenviar", appearance: "primary" },
  {
    icon: <MdOutlineRemoveRedEye />,
    text: "Ver Imagen",
    appearance: "primary",
  },
];

const isValidTagElement = (element: unknown): element is TagElement => {
  return React.isValidElement(element) && element.props !== undefined;
};

export const actionMobile = [
  {
    id: "tags",
    actionName: "",
    content: (data: IEntries) => (
      <Icon
        icon={
          isValidTagElement(data?.tag) &&
          iconActionsMobile(data?.tag?.props?.label ?? "")
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
        onClick={() => entrySelection(data, "Reenviar")}
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
        onClick={() => entrySelection(data, "ver imagen")}
      />
    ),
  },
];

const appearance: { [key: string]: string } = {
  Firmado: "success",
  "En trámite": "warning",
  "Con error": "danger",
};

export const appearanceTag = (tag: string) => {
  return appearance?.[tag] as "success" | "warning" | "danger";
};

export const firstWord = (text: string) => text.split(" ")[0];

export const getTableBoardActions = (
  entrySelection: (data: IEntries, actionId: string) => void 
) =>
  actionsFinanacialReporting.map((action) => ({
    id: action.id,
    actionName: action.actionName,
    label: "Action Label",
    content: (data: IEntries) => (
      <Icon
        appearance="primary"
        cursorHover
        size="22px"
        variant="none"
        icon={action.content(data, action.id).props.icon} 
        onClick={() => entrySelection(data, action.id)}
        spacing="none"
      />
    ),
  }));


export const getTableBoardActionMobile = (
  entrySelection: (data: IEntries, actionId: string) => void 
) =>
  actionMobile.map((action) => ({
    id: action.id,
    actionName: action.actionName,
    label: "Mobile Action Label",
    content: (data: IEntries) => (
      <Icon
        icon={action.content(data).props.icon}
        appearance={action.content(data).props.appearance}
        spacing="none"
        cursorHover
        variant="filled"
        shape="circle"
        onClick={() => entrySelection(data, action.id)}
      />
    ),
  }));
