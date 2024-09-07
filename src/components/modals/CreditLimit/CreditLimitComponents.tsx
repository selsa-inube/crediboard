import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { MdOutlineVisibility, MdInfoOutline } from "react-icons/md";
import {
  StyledRow,
  StyledLabel,
  StyledAmountWithIcon,
  StyledAmount,
  StyledDollarSign,
  StyledContainerText
} from "./styles";

interface CreditLimitRowProps {
  label: string;
  amount: string;
  showIcon?: boolean;
  isLast?: boolean;
}

export const CreditLimitRow = ({ label, amount, showIcon = false, isLast = false }: CreditLimitRowProps) => (
  <StyledRow>
    <StyledLabel>
      <Text appearance="dark" size="large" type="label">
        <strong>{label}</strong>
      </Text>
    </StyledLabel>
    {isLast ? (
      <StyledAmount>
        <Text>
          <StyledDollarSign>$</StyledDollarSign>{amount}
        </Text>
      </StyledAmount>
    ) : (
      <StyledAmountWithIcon>
        <Text>
          <StyledDollarSign>$</StyledDollarSign>{amount}
        </Text>
        {showIcon && (
          <Icon appearance="primary" icon={<MdOutlineVisibility />} size="16px" spacing="none" />
        )}
      </StyledAmountWithIcon>
    )}
  </StyledRow>
);

export const CreditLimitInfoText = () => (
  <StyledContainerText>
    <Icon appearance="primary" icon={<MdInfoOutline />} size="16px" spacing="none" />
    <Text>
      El menor de los anteriores es su cupo<strong> máximo </strong> utilizable.
    </Text>
  </StyledContainerText>
);
