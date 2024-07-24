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
  