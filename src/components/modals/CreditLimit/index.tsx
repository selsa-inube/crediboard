import { createPortal } from "react-dom";
import {
  MdClear,
  MdRefresh,
  MdOutlineVisibility,
  MdInfoOutline,
} from "react-icons/md";
import { Blanket, Button, Stack, useMediaQuery } from "@inube/design-system";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import {
  StyledContainerClose,
  StyledContainerContent,
  StyledModal,
  StyledContainerTitle,
  StyledContainerText,
  StyledDivider,
  StyledRow,
  StyledUpdateButton,
  StyledDollarSign,
  StyledLabel,
  StyledAmount,
  StyledAmountWithIcon,
} from "./styles";

export interface IListModalProps {
  title: string;
  handleClose: () => void;
  portalId?: string;
}

export const CreditLimit = (props: IListModalProps) => {
  const { title, portalId, handleClose } = props;

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
        <StyledContainerTitle>
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
        </StyledContainerTitle>
        <StyledDivider />
        <StyledContainerContent $smallScreen={isMobile}>
          <StyledRow>
            <StyledLabel>
              <Text appearance="dark" size="large" type="label">
                <strong>Cupo máximo según capacidad de pago</strong>
              </Text>
            </StyledLabel>
            <StyledAmountWithIcon>
              <Text>
                <StyledDollarSign>$</StyledDollarSign>20'000.000
              </Text>
              <Icon
                appearance="primary"
                icon={<MdOutlineVisibility />}
                size="16px"
                spacing="none"
              />
            </StyledAmountWithIcon>
          </StyledRow>
          <StyledRow>
            <StyledLabel>
              <Text appearance="dark" size="large" type="label">
                <strong>Cupo máximo por reciprocidad</strong>
              </Text>
            </StyledLabel>
            <StyledAmountWithIcon>
              <Text>
                <StyledDollarSign>$</StyledDollarSign>14'000.000
              </Text>
              <Icon
                appearance="primary"
                icon={<MdOutlineVisibility />}
                size="16px"
                spacing="none"
              />
            </StyledAmountWithIcon>
          </StyledRow>
          <StyledRow>
            <StyledLabel>
              <Text appearance="dark" size="large" type="label">
                <strong>Endeudamiento máximo x FRC</strong>
              </Text>
            </StyledLabel>
            <StyledAmountWithIcon>
              <Text>
                <StyledDollarSign>$</StyledDollarSign>25'000.000
              </Text>
              <Icon
                appearance="primary"
                icon={<MdOutlineVisibility />}
                size="16px"
                spacing="none"
              />
            </StyledAmountWithIcon>
          </StyledRow>
          <StyledRow>
            <StyledLabel>
              <Text appearance="dark" size="large" type="label">
                <strong>Cupo individual asignado</strong>
              </Text>
            </StyledLabel>
            <StyledAmount>
              <Text>
                <StyledDollarSign>$</StyledDollarSign>0
              </Text>
            </StyledAmount>
          </StyledRow>

          <StyledDivider />

          <StyledContainerText>
            <Icon
              appearance="primary"
              icon={<MdInfoOutline />}
              size="16px"
              spacing="none"
            />
            <Text>
              El menor de los anteriores es su cupo
              <strong> máximo </strong> utilizable.
            </Text>
          </StyledContainerText>

          <StyledRow>
            <StyledLabel>
              <Text>Cupo máximo utilizable</Text>
            </StyledLabel>
            <StyledAmount>
              <Text>
                <StyledDollarSign>$</StyledDollarSign>14'000.000
              </Text>
            </StyledAmount>
          </StyledRow>
          <StyledRow>
            <StyledLabel>
              <Text>(-) Cartera vigente</Text>
            </StyledLabel>
            <StyledAmount>
              <Text>
                <StyledDollarSign>$</StyledDollarSign>4'000.000
              </Text>
            </StyledAmount>
          </StyledRow>
          <StyledRow>
            <StyledLabel>
              <Text>Cupo disponible sin garantía</Text>
            </StyledLabel>
            <StyledAmount>
              <Text>
                <StyledDollarSign>$</StyledDollarSign>10'000.000
              </Text>
            </StyledAmount>
          </StyledRow>
        </StyledContainerContent>

        <StyledUpdateButton>
          <Button
            iconAfter={<MdRefresh />}
            onClick={handleClose}
            variant="filled"
            appearance="primary"
            backgroundColor="#0052cc"
            textColor="#ffffff"
          >
            Actualizar
          </Button>
        </StyledUpdateButton>
      </StyledModal>
    </Blanket>,
    node
  );
};
