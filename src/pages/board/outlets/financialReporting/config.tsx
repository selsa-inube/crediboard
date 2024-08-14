import { MdAddCircleOutline } from "react-icons/md";

import { IOptionButtons } from "@components/modals/ListModal";

export const handleConfirmReject = (
  values: { textarea: string },
  setFlagMessage: (message: {
    title: string;
    description: string;
    appearance: "success" | "danger";
  }) => void,
  setShowFlagMessage: (state: boolean) => void,
  setShowRejectModal: (state: boolean) => void
) => {
  const text = values.textarea;

  if (text) {
    setFlagMessage({
      title: "Rechazo Confirmado",
      description: "El rechazo se ha realizado correctamente",
      appearance: "success",
    });
  }

  setShowFlagMessage(true);
  setShowRejectModal(false);
};

export const handleConfirmCancel = (
  values: { textarea: string },
  setFlagMessage: (message: {
    title: string;
    description: string;
    appearance: "success" | "danger";
  }) => void,
  setShowFlagMessage: (state: boolean) => void,
  setShowCancelModal: (state: boolean) => void
) => {
  const text = values.textarea;

  if (text) {
    setFlagMessage({
      title: "Anulación Confirmada",
      description: "La anulación se ha realizado correctamente",
      appearance: "success",
    });
  }

  setShowFlagMessage(true);
  setShowCancelModal(false);
};

export const optionButtons: IOptionButtons = {
  label: "Adjuntar archivo",
  variant: "none",
  icon: <MdAddCircleOutline />,
  fullwidth: false,
  onClick: () => console.log("Adjuntar archivo"),
};

type ConfigHandleactions = {
  buttonReject: () => void;
  buttonCancel: () => void;
  buttonPrint: () => void;
  buttonAttach: () => void;
  buttonViewAttachments: () => void;
  menuIcon: () => void;
};

export const configHandleactions = ({
  buttonReject = () => {},
  buttonCancel = () => {},
  buttonPrint = () => {},
  buttonAttach = () => {},
  buttonViewAttachments = () => {},
  menuIcon = () => {},
}: ConfigHandleactions) => {
  return {
    buttons: {
      buttonReject: {
        OnClick: buttonReject,
      },
      buttonCancel: {
        OnClick: buttonCancel,
      },
      buttonPrint: {
        OnClick: buttonPrint,
      },
    },
    buttonsOutlined: {
      buttonAttach: {
        OnClick: buttonAttach,
      },
      buttonViewAttachments: {
        OnClick: buttonViewAttachments,
      },
    },
    menuIcon: menuIcon,
  };
};
