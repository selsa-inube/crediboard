import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import {
  Blanket,
  Button,
  Icon,
  Stack,
  Text,
  useMediaQuery,
} from "@inube/design-system";
import { StyledModal, StyledContainerContent } from "./styles";

export interface IListmodalProps {
  title: string;
  portalId?: string;
  confirmationText?: string;
  content?: JSX.Element | JSX.Element[];
  handleClose: () => void;
}

export const Listmodal = (props: IListmodalProps) => {
  const { title, portalId, confirmationText, content, handleClose } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {title}
          </Text>
          <Stack gap={8}>
            <Text>Cerrar</Text>
            <Icon
              icon={<MdClear />}
              size="24px"
              cursorHover
              appearance="dark"
              onClick={handleClose}
            />
          </Stack>
        </Stack>
        <Stack>
          <Text>{confirmationText}</Text>
        </Stack>
        <StyledContainerContent $smallScreen={isMobile}>
          {content}
        </StyledContainerContent>
        <Stack justifyContent="flex-end" margin="16px 0">
          <Button onClick={handleClose}>Enviar</Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
};
