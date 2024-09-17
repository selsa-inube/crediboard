import { createPortal } from "react-dom";
import { Blanket } from "@inubekit/blanket";
import { Stack } from "@inubekit/stack";
import { StyledContainerClose, StyledContainerContent } from "./styles";
import { Divider } from "@inubekit/divider";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { MdClear, MdOutlineAdd } from "react-icons/md";
import { Button } from "@inubekit/button";
import { TableExtraordinaryPayment } from "../../data/TableExtraordinaryPayment";
import { IRowExtraordinaryPayment } from "./types";
import { useMediaQuery } from "@inubekit/hooks";

export interface ExtraordinaryPaymentModalProps {
  dataTable: IRowExtraordinaryPayment[];
  handleClose: () => void;
  portalId: string;
  onClickDetails: (id: string) => void;
  onClickEdit: (id: string) => void;
  onClickEliminate: (id: string) => void;
}
export const ExtraordinaryPaymentModal = (
  props: ExtraordinaryPaymentModalProps
) => {
  const {
    dataTable,
    handleClose,
    portalId,
    onClickDetails,
    onClickEdit,
    onClickEliminate,
  } = props;
  const node = document.getElementById(portalId ?? "portal");
  const isMobile = useMediaQuery("(max-width:880px)");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }
  return createPortal(
    <Blanket>
      <StyledContainerContent $isMobile={isMobile}>
        <Stack gap="16px" direction="column">
          <Stack justifyContent="space-between">
            <Text type="headline" size="small" appearance="dark">
              Pagos extras
            </Text>
            <StyledContainerClose onClick={handleClose}>
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
          <Divider />
          <Stack gap="24px" direction="column">
            <Stack justifyContent="end">
              <Button
                type="button"
                appearance="primary"
                spacing="wide"
                fullwidth={isMobile}
                iconBefore={
                  <Icon
                    icon={<MdOutlineAdd />}
                    appearance="light"
                    size="18px"
                    spacing="compact"
                  />
                }
              >
                Agregar serie
              </Button>
            </Stack>
            <Stack>
              <TableExtraordinaryPayment
                data={dataTable}
                onClickDetails={onClickDetails}
                onClickEdit={onClickEdit}
                onClickEliminate={onClickEliminate}
              />
            </Stack>
            <Divider />
            <Stack  justifyContent="end">
              <Button
                appearance="primary"
                fullwidth={isMobile}
                onClick={handleClose}
                spacing="wide"
                type="button"
              >
                Cerrar
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </StyledContainerContent>
    </Blanket>,
    node
  );
};
