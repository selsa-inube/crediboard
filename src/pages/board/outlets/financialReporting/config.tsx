type FlagMessage = {
  title: string;
  description: string;
  appearance: "success" | "danger";
};

type StateUpdater<T> = React.Dispatch<React.SetStateAction<T>>;

type FlagMessageUpdater = StateUpdater<FlagMessage>;
type BooleanUpdater = StateUpdater<boolean>;

export const handleConfirmCancel = (
  values: { textarea: string },
  setFlagMessage: FlagMessageUpdater,
  setShowFlagMessage: BooleanUpdater,
  setShowCancelModal: BooleanUpdater
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
