import { createPortal } from "react-dom";
import { MdClear, MdOutlineAttachMoney } from "react-icons/md";

import { Blanket } from "@inubekit/blanket";
import { Stack } from "@inubekit/stack";
import { inube } from "@inubekit/foundations";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { useMediaQuery } from "@inubekit/hooks";
import { currencyFormat } from "@src/utils/formatData/currency";

import { StyledContainerClose, StyledContainer } from "./styles";
import { Divider } from "@inubekit/divider";
import { Textfield } from "@inubekit/textfield";
import { Button } from "@inubekit/button";

export interface ReciprocityModalProps {
  handleClose: () => void;
  portalId?: string;
  balanceOfContributions: number;
  accordingToRegulation: number;
}

export function ReciprocityModal(props: ReciprocityModalProps) {
  const {
    portalId,
    handleClose,
    balanceOfContributions,
    accordingToRegulation,
  } = props;

  const isMobile = useMediaQuery("(max-width:880px)");

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledContainer>
        <Stack
          direction="column"
          padding="24px"
          gap="24px"
          width={!isMobile ? "502px" : "287px"}
        >
          <Stack justifyContent="space-between" alignItems="center" gap="15px">
            <Text size="small" type="headline">
              Cupo máx. por reciprocidad
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
          <Stack direction="column" justifyContent="space-between" gap="12px">
            <Stack justifyContent="space-between" gap="40px">
              <Text type="label" size="large" weight="bold">
                Saldo de aportes y ahorros permanentes
              </Text>
              <Stack>
                <Text type="body" size="medium" appearance="success">
                  $
                </Text>
                <Text type="body" size="medium">
                  {currencyFormat(balanceOfContributions, false)}
                </Text>
              </Stack>
            </Stack>
            <Stack justifyContent="space-between" gap="40px">
              <Text type="label" size="large" weight="bold">
                No. de veces posible según reglamento
              </Text>
              <Stack>
                <Text type="body" size="medium">
                  {currencyFormat(accordingToRegulation, false)}
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Divider />
          <Textfield
            id="field1"
            iconBefore={
              <MdOutlineAttachMoney
                color={inube.icon.dark.content.color.regular}
              />
            }
            label="Cupo asignado"
            placeholder="Ingrese la cantidad"
            type="number"
            fullwidth
          />
          <Divider />
          <Stack justifyContent="end">
            <Button
              children="Cerrar"
              appearance="primary"
              onClick={handleClose}
              fullwidth={isMobile}
            />
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}
