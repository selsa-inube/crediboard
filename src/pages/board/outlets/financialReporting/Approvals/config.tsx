import { isValidElement, cloneElement } from "react";
import {
  MdCheck,
  MdClose,
  MdNotificationsNone,
  MdRemove,
  MdWarningAmber,
} from "react-icons/md";
import { Icon } from "@inubekit/icon";
import { IEntries } from "@components/data/TableBoard/types";

const handleData = (data: IEntries) => {
  console.log(data, "function that receives data");
};

export const titlesApprovals = [
  {
    id: "usuarios",
    titleName: "Usuarios",
    priority: 1,
  },
  {
    id: "tag",
    titleName: "Decisión",
    priority: 2,
  },
];

export const actionsApprovals = [
  {
    id: "Error",
    actionName: "Error",
    content: (data: IEntries) => {
      const error = Boolean(data.error);
      return (
        <Icon
          icon={<MdWarningAmber />}
          appearance="warning"
          spacing="none"
          cursorHover
          size="22px"
          disabled={!error}
        />
      );
    },
  },
  {
    id: "notificaciones",
    actionName: "Notificar",
    content: (data: IEntries) => (
      <Icon
        icon={<MdNotificationsNone />}
        appearance="primary"
        spacing="none"
        cursorHover
        size="22px"
        disabled={
          isValidElement(data?.tag) && data?.tag?.props?.label !== "Pendiente"
        }
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
  { icon: <MdCheck />, text: "Aprobado" },
  { icon: <MdClose />, text: "Rechazado" },
  { icon: <MdRemove />, text: "Pendiente" },
  { icon: <MdWarningAmber />, text: "Error", appearance: "danger" },
  { icon: <MdNotificationsNone />, text: "Notificaciones", appearance: "help" },
];

const isValidTagElement = (element: unknown): element is TagElement => {
  return isValidElement(element) && element.props !== undefined;
};

export const actionMobileApprovals = [
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
        cursorHover
        variant="filled"
        shape="circle"
      />
    ),
  },
  {
    id: "Error",
    actionName: "",
    content: (data: IEntries) => (
      <Icon
        icon={<MdWarningAmber />}
        appearance="warning"
        spacing="none"
        cursorHover
        size="20px"
        onClick={() => handleData(data)}
        disabled={
          isValidElement(data?.tag) && data?.tag?.props?.label !== "Pendiente"
        }
      />
    ),
  },
  {
    id: "notificaciones",
    actionName: "",
    content: (data: IEntries) => (
      <Icon
        icon={<MdNotificationsNone />}
        appearance="primary"
        spacing="none"
        cursorHover
        size="20px"
        onClick={() => handleData(data)}
        disabled={
          isValidElement(data?.tag) && data?.tag?.props?.label !== "Pendiente"
        }
      />
    ),
  },
];

export const handleNotificationClick = (
  data: IEntries,
  setSelectedData: (data: IEntries) => void,
  setShowModal: (showModal: boolean) => void
) => {
  const tag = data?.tag;
  if (isValidElement(tag) && tag.props?.label === "Pendiente") {
    setSelectedData(data);
    setShowModal(true);
  }
};

export const handleErrorClick = (
  data: IEntries,
  setSelectedData: (data: IEntries) => void,
  setShowModal: (showModal: boolean) => void
) => {
  const tag = data?.tag;
  if (isValidElement(tag) && tag.props?.label === "Pendiente") {
    setSelectedData(data);
    setShowModal(true);
  }
};

interface Action {
  id: string;
  actionName: string;
  content: (data: IEntries) => JSX.Element;
}

export const desktopActions = (
  actionsApprovals: Action[],
  handleNotificationClick: (data: IEntries) => void,
  handleErrorClick: (data: IEntries) => void
) => {
  return actionsApprovals.map((action) => ({
    id: action.id,
    actionName: action.actionName,
    content: (data: IEntries) => {
      const handleClick = () => {
        if (action.id === "notificaciones") {
          handleNotificationClick(data);
        } else if (action.id === "Error") {
          handleErrorClick(data);
        }
      };
      return cloneElement(action.content(data), { onClick: handleClick });
    },
  }));
};

export const getMobileActionsConfig = (
  actionMobileApprovals: Action[],
  handleNotificationClickBound: (data: IEntries) => void,
  handleErrorClickBound: (data: IEntries) => void
) => {
  return actionMobileApprovals.map((action) => ({
    id: action.id,
    content: (data: IEntries) => {
      const handleClick = () => {
        if (action.id === "notificaciones") {
          handleNotificationClickBound(data);
        } else if (action.id === "Error") {
          handleErrorClickBound(data);
        }
      };
      return cloneElement(action.content(data), { onClick: handleClick });
    },
  }));
};