type FlagMessage = {
  title: string;
  description: string;
  appearance: "success" | "danger";
};

type SetFlagMessage = (message: FlagMessage) => void;
type SetBoolean = (value: boolean) => void;

export const handleConfirmCancel = (
  values: { textarea: string },
  setFlagMessage: SetFlagMessage,
  setShowFlagMessage: SetBoolean,
  setShowCancelModal: SetBoolean
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
