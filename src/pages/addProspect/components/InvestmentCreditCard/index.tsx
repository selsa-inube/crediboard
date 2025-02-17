import { Divider } from "@inubekit/divider";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { currencyFormat } from "@utils/formatData/currency";
import { StyledContainer, StyledInput } from "./styles";

interface IPaymentOption {
  label: string;
  value: string | number;
  isCurrency?: boolean;
}

export interface InvestmentCreditCardProps {
  title: string;
  code: string;
  codeValue: string;
  expired: string;
  expiredValue: number;
  isMobile?: boolean;
}

export function InvestmentCreditCard({
  title,
  code,
  codeValue,
  expired,
  expiredValue,
  isMobile,
}: InvestmentCreditCardProps) {
  const paymentOptions: IPaymentOption[] = [
    {
      label: code,
      value: codeValue,
      isCurrency: false,
    },
    {
      label: expired,
      value: expiredValue,
      isCurrency: true,
    },
  ];

  return (
    <StyledContainer $isMobile={isMobile}>
      <Stack
        direction="column"
        padding={isMobile ? "16px 10px" : "16px 20px"}
        gap="16px"
        width="256px"
      >
        <Text type="label" size="large" weight="bold" appearance="dark">
          {title}
        </Text>
        <Divider dashed />
        <Stack direction="column" gap="8px">
          {paymentOptions.map((item) => (
            <StyledInput key={item.label}>
              <Stack alignItems="center" justifyContent="space-between">
                <Text type="label" size="medium" weight="bold">
                  {item.label}
                </Text>
                <Text type="body" size="small" appearance="gray">
                  {item.isCurrency
                    ? currencyFormat(Number(item.value))
                    : item.value}
                </Text>
              </Stack>
            </StyledInput>
          ))}
        </Stack>
      </Stack>
    </StyledContainer>
  );
}
