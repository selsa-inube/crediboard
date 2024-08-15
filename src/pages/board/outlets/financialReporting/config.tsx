import { MdAddCircleOutline } from "react-icons/md";

import { IOptionButtons } from "@components/modals/ListModal";
import { addItem } from "@src/mocks/utils/dataMock.service";

export const handleConfirmReject = async (
  id: string,
  user: string,
  formData: { textarea: string },
  setFlagMessage: (message: {
    title: string;
    description: string;
    appearance: "success" | "danger";
  }) => void,
  setShowFlagMessage: (state: boolean) => void,
  setShowRejectModal: (state: boolean) => void
) => {
  const justificationText = formData.textarea;

  console.log("user:", user);

  if (justificationText && id) {
    const trace = {
      traceId: crypto.randomUUID(),
      traceValue: "Document uploaded",
      creditRequestId: id,
      useCase: "document_upload",
      userId: user,
      executionDate: new Date().toLocaleDateString(),
      justification: justificationText,
      decisionTakenByUser: "rejected",
      traceType: "novelty_document",
      readNovelty: "N",
    };

    const handleSuccess = () => {
      setFlagMessage({
        title: "Rechazo Confirmado",
        description: "El rechazo se ha realizado correctamente",
        appearance: "success",
      });
      setShowFlagMessage(true);
      setShowRejectModal(false);
    };

    const handleError = (error: Error) => {
      setFlagMessage({
        title: "Rechazo Fallido",
        description: `No se ha podido realizar el rechazo: ${error}`,
        appearance: "danger",
      });
      setShowFlagMessage(true);
      setShowRejectModal(false);
    };

    try {
      await addItem("trace", trace);
      handleSuccess();
    } catch (error) {
      handleError(error as Error);
    }
  }
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
