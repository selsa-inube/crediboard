import { useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";

import { Blanket } from "@inubekit/blanket";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { useMediaQuery } from "@inubekit/hooks";

import { validationMessages } from "@validations/validationMessages";
import { StyledContainerClose, StyledModal } from "./styles";

export interface IDocumentViewerProps {
  title: string;
  selectedFile: string;
  handleClose?: () => void;
  portalId?: string;
}

export const DocumentViewer = (props: IDocumentViewerProps) => {
  const { portalId, selectedFile, handleClose, title } = props;
  const node = document.getElementById(portalId ?? "portal");

  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }
  const isMobile = useMediaQuery("(max-width: 700px)");

  useEffect(() => {
    if (selectedFile && isMobile) {
      window.open(selectedFile, "_blank");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  const googleViewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(selectedFile)}`;

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {title}
          </Text>
          <StyledContainerClose onClick={handleClose}>
            <Stack alignItems="center" gap="8px">
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
                onClick={handleClose}
              />
            </Stack>
          </StyledContainerClose>
        </Stack>
        {selectedFile && isMobile ? (
          <>
            <iframe
              src={googleViewerUrl}
              height={isMobile ? "376px" : "850px"}
            ></iframe>
          </>
        ) : (
          "Documento Descargado satisfactoriamente"
        )}
      </StyledModal>
    </Blanket>,
    node
  );
};
