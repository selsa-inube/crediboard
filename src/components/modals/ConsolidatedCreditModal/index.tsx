import { createPortal } from "react-dom";
import { Blanket } from "@inubekit/blanket";
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
    throw new Error(
      "The portal node is not defined. Ensure the portal has been set correctly."
    );
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
