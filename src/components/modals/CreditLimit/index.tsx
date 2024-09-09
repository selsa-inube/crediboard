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

export interface ICreditLimitProps {
  title: string;
  handleClose: () => void;
  portalId?: string;
  maxPaymentCapacity: number;  
  maxReciprocity: number;      
  maxDebtFRC: number;          
  assignedLimit: number;       
  currentPortfolio: number;    
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
    currentPortfolio 
  } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("es-CO");
  };

  const maxUsableLimit = Math.min(maxPaymentCapacity, maxReciprocity, maxDebtFRC);
  const availableLimitWithoutGuarantee = maxUsableLimit - currentPortfolio;

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
              <Text appearance="dark" size="large"  weight="bold">
                Cupo máximo según capacidad de pago
              </Text>
            </StyledLabel>
            <StyledAmountWithIcon>
              <Text>
                <StyledDollarSign>$</StyledDollarSign>{formatCurrency(maxPaymentCapacity)}
              </Text>
              <Icon
                appearance="primary"
                icon={<MdOutlineVisibility />}
                size="16px"
                spacing="none"
                cursorHover
              />
            </StyledAmountWithIcon>
          </StyledRow>
          <StyledRow>
            <StyledLabel>
              <Text appearance="dark" size="large"  weight="bold">
                Cupo máximo por reciprocidad 
              </Text>
            </StyledLabel>
            <StyledAmountWithIcon>
              <Text>
                <StyledDollarSign>$</StyledDollarSign>{formatCurrency(maxReciprocity)}
              </Text>
              <Icon
                appearance="primary"
                icon={<MdOutlineVisibility />}
                size="16px"
                spacing="none"
                cursorHover
              />
            </StyledAmountWithIcon>
          </StyledRow>
          <StyledRow>
            <StyledLabel>
              <Text appearance="dark" size="large"  weight="bold">
                Endeudamiento máximo x FRC
              </Text>
            </StyledLabel>
            <StyledAmountWithIcon>
              <Text weight="bold">
                <StyledDollarSign>$</StyledDollarSign>{formatCurrency(maxDebtFRC)}
              </Text>
              <Icon
                appearance="primary"
                icon={<MdOutlineVisibility />}
                size="16px"
                spacing="none"
                cursorHover
              />
            </StyledAmountWithIcon>
          </StyledRow>
          <StyledRow>
            <StyledLabel>
              <Text appearance="dark" size="large"  weight="bold">
                Cupo individual asignado
              </Text>
            </StyledLabel>
            <StyledAmount>
              <Text weight="bold">
                <StyledDollarSign>$</StyledDollarSign>{formatCurrency(assignedLimit)}
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
            <Text margin="5px">
              El menor de los anteriores es su cupo
              <strong> máximo </strong> utilizable.
            </Text>
          </StyledContainerText>

          <StyledRow>
            <StyledLabel>
              <Text weight="bold">Cupo máximo utilizable</Text>
            </StyledLabel>
            <StyledAmount>
              <Text>
                <StyledDollarSign>$</StyledDollarSign>{formatCurrency(maxUsableLimit)}
              </Text>
            </StyledAmount>
          </StyledRow>
          <StyledRow>
            <StyledLabel>
              <Text>(-) Cartera vigente</Text>
            </StyledLabel>
            <StyledAmount>
              <Text>
                <StyledDollarSign>$</StyledDollarSign>{formatCurrency(currentPortfolio)}
              </Text>
            </StyledAmount>
          </StyledRow>
          <StyledRow>
            <StyledLabel>
              <Text weight="bold">Cupo disponible sin garantía</Text>
            </StyledLabel>
            <StyledAmount>
              <Text weight="bold">
                <StyledDollarSign>$</StyledDollarSign>{formatCurrency(availableLimitWithoutGuarantee)}
              </Text>
            </StyledAmount>
          </StyledRow>
        </StyledContainerContent>
        <StyledDivider />
        <StyledUpdateButton>
          <Button
            iconAfter={<MdRefresh />}
            onClick={handleClose}
            variant="filled"
            appearance="primary"
          >
            Actualizar
          </Button>
        </StyledUpdateButton>
      </StyledModal>
    </Blanket>,
    node
  );
};
