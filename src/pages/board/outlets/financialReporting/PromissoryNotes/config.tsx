import { isValidElement } from "react";
import {
  MdOutlineShare,
  MdOutlineRemoveRedEye,
  MdCheck,
  MdRemove,
  MdClose,
} from "react-icons/md";
import { Icon } from "@inubekit/icon";
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

export const actionsFinanacialReporting = [
  {
    id: "Reenviar",
    actionName: "Reenviar",
    content: (data: IEntries) => (
      <Icon
        appearance="primary"
        cursorHover
        size="22px"
        variant="empty"
        icon={<MdOutlineShare  />}
        onClick={() => entrySelection(data)}
        spacing="narrow"
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
        spacing="narrow"
        variant="empty"
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

export const infoItems = [
  { icon: <MdOutlineShare  />, text: "Reenviar", appearance: "primary" },
  { icon: <MdOutlineRemoveRedEye />, text: "Ver Imagen", appearance: "primary" },
];

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
        spacing="narrow"
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
        spacing="narrow"
        cursorHover
        icon={<MdOutlineShare  />}
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
        spacing="narrow"
        cursorHover
        icon={<MdOutlineRemoveRedEye />}
        onClick={() => entrySelection(data)}
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
  entrySelection: (data: IEntries) => void
) =>
  actionsFinanacialReporting.map((action) => ({
    id: action.id,
    actionName: action.actionName,
    label: "Action Label",
    content: (data: IEntries) => (
      <Icon
        {...action.content(data).props}
        onClick={() => {
          if (action.id === "Reenviar") {
            entrySelection(data);
          }
        }}
      />
    ),
  }));

export const getTableBoardActionMobile = (
  entrySelection: (data: IEntries) => void
) =>
  actionMobile.map((action) => ({
    id: action.id,
    actionName: action.actionName,
    label: "Mobile Action Label",
    content: (data: IEntries) => (
      <Icon
        {...action.content(data).props}
        onClick={() => {
          if (action.id === "Reenviar") {
            entrySelection(data);
          }
        }}
      />
    ),
  }));
