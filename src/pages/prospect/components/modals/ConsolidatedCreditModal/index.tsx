import { createPortal } from "react-dom";
import { Blanket } from "@inubekit/blanket";
import { validationMessages } from "@validations/validationMessages";
import { ConsolidatedCreditsInterface } from "./interface";

export interface ConsolidatedCreditsProps {
  handleClose: () => void;
  portalId?: string;
  loading?: boolean;
}

export const ConsolidatedCredits = (props: ConsolidatedCreditsProps) => {
  const { portalId, handleClose, loading = false } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }

  return createPortal(
    <Blanket>
      <ConsolidatedCreditsInterface
        loading={loading}
        handleClose={handleClose}
      />
    </Blanket>,
    node
  );
};
