import { useState } from "react";
import { Stack } from "@inubekit/stack";

import { TextAreaModal } from "@components/modals/TextAreaModal";
import { StyledContainerToCenter } from "./styles";

interface IContainerSectionsProps {
  children?: JSX.Element | JSX.Element[];
  stocktray: JSX.Element;
  isMobile?: boolean;
}

export const ContainerSections = (props: IContainerSectionsProps) => {
  const { children, stocktray, isMobile } = props;

  const [showRejectionModal, setShowRejectionModal] = useState(false);

  return (
    <>
      <StyledContainerToCenter>
        <Stack
          width={isMobile ? "-webkit-fill-available" : "min(100%,1440px)"}
          direction="column"
        >
          {stocktray}
          <Stack direction="column">{children}</Stack>
        </Stack>
      </StyledContainerToCenter>
      {showRejectionModal && (
        <TextAreaModal
          title="Rechazar"
          buttonText="Confirmar"
          inputLabel="Motivo del rechazo."
          inputPlaceholder="Describa el motivo del rechazo."
          onCloseModal={() => setShowRejectionModal(!showRejectionModal)}
          onSubmit={() => setShowRejectionModal(!showRejectionModal)}
        />
      )}
    </>
  );
};
