import React from "react";
import {
  Stack,
  useMediaQuery,
  Blanket,
  Text,
  Button,
  inube,
} from "@inube/design-system";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { StyledModal } from "./styles";

export interface NotificationModalProps {
  title: string;
  buttonText: string;
  confirmationText: string;
  portalId?: string;
  onSubmit: (values: { textarea: string }) => void;
  onCloseModal: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  title,
  buttonText,
  confirmationText,
  portalId = "portal",
  onSubmit,
  onCloseModal,
}) => {
  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "El nodo del portal no está definido. Esto puede ocurrir cuando el nodo específico utilizado para renderizar el portal no se ha definido correctamente."
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {title}
          </Text>
          <Stack gap={inube.spacing.s100}>
            <Text>Cerrar</Text>
            <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
          </Stack>
        </Stack>
        <Stack spacing="s200">
          <Text padding="0px 0px 20px">{confirmationText}</Text>
        </Stack>
        <Stack justifyContent="flex-end" margin="s200 s0">
        <Button onClick={() => { onSubmit({ textarea: "example" }); onCloseModal(); }}>
            {buttonText}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
};
