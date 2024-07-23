type FlagMessage = {
  title: string;
  description: string;
  appearance: "success" | "danger";
};

export const handleConfirmCancel = (
  values: { textarea: string },
  setFlagMessage: React.Dispatch<React.SetStateAction<FlagMessage>>,
  setShowFlagMessage: React.Dispatch<React.SetStateAction<boolean>>,
  setShowCancelModal: React.Dispatch<React.SetStateAction<boolean>>,
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
