import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import {
  Blanket,
  Button,
  Icon,
  Stack,
  Text,
  inube,
  useMediaQuery,
} from "@inube/design-system";

import { StyledContainerContent, StyledModal } from "./styles";

export interface IListmodalProps {
  title: string;
  portalId?: string;
  content?: JSX.Element | JSX.Element[];
  handleClose: () => void;
}

export const Listmodal = (props: IListmodalProps) => {
  const { title, portalId, content, handleClose } = props;

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
          <Stack gap={inube.spacing.s100}>
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
        <StyledContainerContent $smallScreen={isMobile}>
          {content}
        </StyledContainerContent>
        <Stack justifyContent="flex-end" margin="s200 s0">
          <Button onClick={handleClose}>Cerrar</Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
};
