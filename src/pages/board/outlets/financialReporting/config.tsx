export const handleConfirmCancel = (
  values: { textarea: string },
  setFlagMessage: (message: { title: string; description: string; appearance: "success" | "danger" }) => void,
  setShowFlagMessage: (value: boolean) => void,
  setShowCancelModal: (value: boolean) => void
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
