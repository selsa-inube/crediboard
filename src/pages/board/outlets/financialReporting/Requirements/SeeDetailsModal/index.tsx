import { createPortal } from "react-dom";
import { MdClear, MdOutlineCalendarMonth } from "react-icons/md";
import { Stack, Icon, Text } from "@inubekit/inubekit";
import { useMediaQuery } from "@inubekit/hooks";
import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";
import { Textarea } from "@inubekit/textarea";
import { Textfield } from "@inubekit/textfield";

import { formatPrimaryDate } from "@utils/formatData/date";

import { StyledModal, StyledTextarea, StyledContainerClose } from "./styles";

export interface SeeDetailsModalProps {
  date: Date;
  details: string;
  portalId?: string;
  onCloseModal?: () => void;
}

export function SeeDetailsModal(props: SeeDetailsModalProps) {
  const {
    date = new Date(),
    details = "",
    portalId = "portal",
    onCloseModal,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const node = document.getElementById(portalId);

  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            Más detalles
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap="8px">
              <Text>Cerrar</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </Stack>
        <Stack direction="column" gap="24px">
          <Textfield
            id="date"
            name="date"
            label="Fecha"
            value={formatPrimaryDate(date)}
            onChange={() => {}}
            iconBefore={<MdOutlineCalendarMonth />}
          />
          <StyledTextarea>
            <Textarea
              id="observation"
              label="Observación"
              value={details}
              onChange={() => {}}
              fullwidth
            />
          </StyledTextarea>
        </Stack>
        <Stack justifyContent="flex-end" margin="16px 0">
          <Button onClick={onCloseModal}>Cerrar</Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}
