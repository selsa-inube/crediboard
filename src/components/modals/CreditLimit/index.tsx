import { createPortal } from "react-dom";
import { MdClear, MdOutlineVisibility, MdInfoOutline } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Blanket } from "@inubekit/blanket";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";

import { currencyFormat } from "@utils/formatData/currency";

import {
  StyledContainerClose,
  StyledModal,
  StyledDivider,
  StyledList,
} from "./styles";

export interface ICreditLimitProps {
  title: string;
  handleClose: () => void;
  portalId?: string;
  maxPaymentCapacity: number;
  maxReciprocity: number;
  maxDebtFRC: number;
  assignedLimit: number;
  currentPortfolio: number;
  maxUsableLimit: number;
  availableLimitWithoutGuarantee: number;
}

export const CreditLimit = (props: ICreditLimitProps) => {
  const {
    title,
    portalId,
    handleClose,
    maxPaymentCapacity,
    maxReciprocity,
    maxDebtFRC,
    assignedLimit,
    currentPortfolio,
    maxUsableLimit,
    availableLimitWithoutGuarantee,
  } = props;

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
        <Stack justifyContent="space-between">
          <Text type="headline" size="small" appearance="dark">
            {title}
          </Text>
          <StyledContainerClose onClick={handleClose}>
            <Stack alignItems="center" gap="5px">
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
        <StyledDivider />
        <Stack direction="column">
          <StyledList>
            <li>
              <Stack padding="10px 0px" justifyContent="space-between">
                <Text appearance="dark" size="large" weight="bold">
                  Cupo máximo según capacidad de pago
                </Text>

                <Stack alignItems="center" gap="8px">
                  <Text>{currencyFormat(maxPaymentCapacity)}</Text>
                  <Icon
                    appearance="primary"
                    icon={<MdOutlineVisibility />}
                    size="16px"
                    spacing="none"
                    cursorHover
                    variant="filled"
                    shape="circle"
                  />
                </Stack>
              </Stack>
            </li>
            <li>
              <Stack padding="10px 0px" justifyContent="space-between">
                <Text appearance="dark" size="large" weight="bold">
                  Cupo máximo por reciprocidad
                </Text>

                <Stack alignItems="center" gap="8px">
                  <Text>{currencyFormat(maxReciprocity)}</Text>
                  <Icon
                    appearance="primary"
                    icon={<MdOutlineVisibility />}
                    size="16px"
                    spacing="none"
                    cursorHover
                    variant="filled"
                    shape="circle"
                  />
                </Stack>
              </Stack>
            </li>
            <li>
              <Stack padding="10px 0px" justifyContent="space-between">
                <Text appearance="dark" size="large" weight="bold">
                  Endeudamiento máximo x FRC
                </Text>

                <Stack alignItems="center" gap="8px">
                  <Text weight="bold">{currencyFormat(maxDebtFRC)}</Text>
                  <Icon
                    appearance="primary"
                    icon={<MdOutlineVisibility />}
                    size="16px"
                    spacing="none"
                    cursorHover
                    variant="filled"
                    shape="circle"
                  />
                </Stack>
              </Stack>
            </li>
            <li>
              <Stack padding="10px" justifyContent="space-between">
                <Text appearance="dark" size="large" weight="bold">
                  Cupo individual asignado
                </Text>
                <Text weight="bold">{currencyFormat(assignedLimit)}</Text>
              </Stack>
            </li>
          </StyledList>

          <StyledDivider />

          <Stack alignItems="center" margin="10px 0px">
            <Icon
              appearance="primary"
              icon={<MdInfoOutline />}
              size="16px"
              spacing="none"
            />
            <Text margin="5px" size="small">
              El menor de los anteriores es su cupo
              <strong> máximo </strong> utilizable.
            </Text>
          </Stack>

          <Stack padding="10px 0px" justifyContent="space-between">
            <Text weight="bold">Cupo máximo utilizable</Text>

            <Text>{currencyFormat(maxUsableLimit)}</Text>
          </Stack>
          <Stack padding="10px 0px" justifyContent="space-between">
            <Text>(-) Cartera vigente</Text>

            <Text>{currencyFormat(currentPortfolio)}</Text>
          </Stack>
          <Stack padding="10px 0px" justifyContent="space-between">
            <Text weight="bold">Cupo disponible sin garantía</Text>

            <Text weight="bold">
              {currencyFormat(availableLimitWithoutGuarantee)}
            </Text>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack justifyContent="end">
          <Button
            onClick={handleClose}
            variant="filled"
            appearance="primary"
            fullwidth={isMobile}
          >
            cerrar
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
};
