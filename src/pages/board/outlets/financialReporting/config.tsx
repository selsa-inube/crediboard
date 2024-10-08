import { MdAddCircleOutline } from "react-icons/md";

import { IOptionButtons } from "@components/modals/ListModal";
import { addItem } from "@src/mocks/utils/dataMock.service";

type Observer<T> = (data: T) => void;

function observer<T>() {
  const observers: Observer<T>[] = [];

  return {
    subscribe: (observer: Observer<T>) => {
      observers.push(observer);
    },
    unsubscribe: (observer: Observer<T>) => {
      observers.filter((obs) => obs !== observer);
    },
    notify: (data: T) => {
      observers.forEach((observer) => observer(data));
    },
  };
}

export const traceObserver = observer();

export const errorObserver = observer<{
  id: string;
  message: string;
}>();

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

  if (justificationText && id) {
    const trace = {
      trace_value: "Document uploaded",
      credit_request_id: id,
      use_case: "document_upload",
      user_id: user,
      execution_date: new Date().toISOString(),
      justification: justificationText,
      decision_taken_by_user: "rejected",
      trace_type: "executed_task",
      read_novelty: "",
    };

    const handleSuccess = () => {
      setFlagMessage({
        title: "Rechazo confirmado",
        description: "El rechazo se ha realizado correctamente",
        appearance: "success",
      });
      setShowFlagMessage(true);
      setShowRejectModal(false);
    };

    const handleError = (error: Error) => {
      setFlagMessage({
        title: "Rechazo fallido",
        description: `No se ha podido realizar el rechazo: ${error}`,
        appearance: "danger",
      });
      setShowFlagMessage(true);
      setShowRejectModal(false);
    };

    try {
      await addItem("trace", trace);
      traceObserver.notify(trace);
      handleSuccess();
    } catch (error) {
      handleError(error as Error);
    }
  }
};

export const handleConfirmCancel = async (
  id: string,
  user: string,
  formData: { textarea: string },
  setFlagMessage: (message: {
    title: string;
    description: string;
    appearance: "success" | "danger";
  }) => void,
  setShowFlagMessage: (state: boolean) => void,
  setShowCancelModal: (state: boolean) => void
) => {
  const justificationText = formData.textarea;

  if (justificationText && id) {
    const trace = {
      trace_value: "Document cancelled",
      credit_request_id: id,
      use_case: "document_cancel",
      user_id: user,
      execution_date: new Date().toISOString(),
      justification: justificationText,
      decision_taken_by_user: "cancelled",
      trace_type: "executed_task",
      read_novelty: "",
    };

    const handleSuccess = () => {
      setFlagMessage({
        title: "Anulación confirmada",
        description: "La anulación se ha realizado correctamente",
        appearance: "success",
      });
      setShowFlagMessage(true);
      setShowCancelModal(false);
    };

    const handleError = (error: Error) => {
      setFlagMessage({
        title: "Anulación fallida",
        description: `No se ha podido realizar la anulación: ${error}`,
        appearance: "danger",
      });
      setShowFlagMessage(true);
      setShowCancelModal(false);
    };

    try {
      await addItem("trace", trace);
      traceObserver.notify(trace);
      handleSuccess();
    } catch (error) {
      handleError(error as Error);
    }
  }
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
