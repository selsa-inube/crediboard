import {
  Stack,
  useMediaQuery,
  Blanket,
  Text,
  Button,
  inube,
  Textarea,
} from "@inube/design-system";
import { Datefield } from "@inubekit/datefield";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";

import { StyledModal } from "./styles";

export interface SeeDetailsModalProps {
  date: string;
  details: string;
  portalId?: string;
  onCloseModal?: () => void;
}

export function SeeDetailsModal(props: SeeDetailsModalProps) {
  const { date = "", details = "", portalId = "portal", onCloseModal } = props;

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
          <Stack gap={inube.spacing.s100}>
            <Text>Cerrar</Text>
            <MdClear size={24} cursor="pointer" onClick={onCloseModal} />
          </Stack>
        </Stack>
        <Stack direction="column" gap={inube.spacing.s300}>
          <Datefield
            id="date"
            name="date"
            label="Fecha"
            value={date}
            size="wide"
            status="pending"
            disabled
          />
          <Textarea label="Observación" value={details} fullwidth readOnly />
        </Stack>
        <Stack justifyContent="flex-end" margin="s200 s0">
          <Button onClick={onCloseModal}>Cerrar</Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
}
