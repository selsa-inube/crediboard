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
  setShowRejectModal: (state: boolean) => void,
  handleUpdateData: (state: boolean) => void
) => {
  handleUpdateData(false);
  const justificationText = formData.textarea;

  if (justificationText && id) {
    const trace = {
      trace_id: crypto.randomUUID(),
      trace_value: "Document uploaded",
      credit_request_id: id,
      use_case: "document_upload",
      user_id: user,
      execution_date: new Date().toLocaleDateString(),
      justification: justificationText,
      decision_taken_by_user: "rejected",
      trace_type: "novelty_document",
      read_novelty: "N",
    };

    const handleSuccess = () => {
      setFlagMessage({
        title: "Rechazo Confirmado",
        description: "El rechazo se ha realizado correctamente",
        appearance: "success",
      });
      setShowFlagMessage(true);
      setShowRejectModal(false);
      handleUpdateData(true);
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
