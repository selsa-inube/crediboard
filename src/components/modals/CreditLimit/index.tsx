import { createPortal } from "react-dom";
import { MdClear, MdRefresh } from "react-icons/md";
import { Blanket, Button, Stack, useMediaQuery } from "@inube/design-system";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import {
  StyledContainerClose,
  StyledDivider,
  StyledModal,
  StyledUpdateButton,
  StyledContainerTitle,
  StyledContainerContent
} from "./styles";
import { CreditLimitRow, CreditLimitInfoText } from "./CreditLimitComponents";

export interface IListModalProps {
  title: string;
  handleClose: () => void;
  portalId?: string;
}

export const CreditLimit = ({ title, portalId, handleClose }: IListModalProps) => {
  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error("The portal node is not defined. Please ensure the portal is set correctly.");
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <StyledContainerTitle>
          <Text type="headline" size="small" appearance="dark">
            {title}
          </Text>
          <StyledContainerClose onClick={handleClose}>
            <Stack alignItems="center" gap="5px">
              <Text>Cerrar</Text>
              <Icon icon={<MdClear />} size="24px" cursorHover appearance="dark" />
            </Stack>
          </StyledContainerClose>
        </StyledContainerTitle>

        <StyledDivider />

        <StyledContainerContent $smallScreen={isMobile}>
          <CreditLimitRow label="Cupo máximo según capacidad de pago" amount="20'000.000" showIcon />
          <CreditLimitRow label="Cupo máximo por reciprocidad" amount="14'000.000" showIcon />
          <CreditLimitRow label="Endeudamiento máximo x FRC" amount="25'000.000" showIcon />
          <CreditLimitRow label="Cupo individual asignado" amount="0" showIcon isLast />

          <StyledDivider />

          <CreditLimitInfoText />

          <CreditLimitRow label="Cupo máximo utilizable" amount="14'000.000" isLast />
          <CreditLimitRow label="(-) Cartera vigente" amount="4'000.000"  isLast/>
          <CreditLimitRow label="Cupo disponible sin garantía" amount="10'000.000" isLast />
        </StyledContainerContent>

        <StyledDivider />

        <StyledUpdateButton>
          <Button iconAfter={<MdRefresh />} onClick={handleClose} variant="filled" appearance="primary">
            Actualizar
          </Button>
        </StyledUpdateButton>
      </StyledModal>
    </Blanket>,
    node
  );
};
