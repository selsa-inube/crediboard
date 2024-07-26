import { MdOutlinePaid } from "react-icons/md";
import { inube, Stack, Text } from "@inube/design-system";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { StyledDivider } from "@components/cards/SummaryCard/styles";
import { currencyFormat } from "@utils/formatData/currency";

interface PaymentCapacityProps {
  availableValue: number;
  availablePercentage: number;
  incomeB: number;
  percentageUsed: number;
  isMobile?: boolean;
}

export function PaymentCapacity(props: PaymentCapacityProps) {
  const {
    availableValue,
    availablePercentage,
    incomeB,
    percentageUsed,
    isMobile,
  } = props;
  return (
    <CardInfoContainer
      title="Capacidad de pago"
      icon={<MdOutlinePaid />}
      isMobile={isMobile}
    >
      <Stack
        direction="column"
        gap={isMobile ? inube.spacing.s075 : inube.spacing.s200}
      >
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="110px">
            <Text size={isMobile ? "small" : "medium"}>Valor disponible</Text>
          </Stack>
          <Stack>
            <Text
              appearance="primary"
              type="headline"
              size={isMobile ? "small" : "medium"}
            >
              {availableValue === 0 ? "$ 0" : currencyFormat(availableValue)}
            </Text>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="120px">
            <Text size={isMobile ? "small" : "medium"}>% Disponible</Text>
          </Stack>
          <Stack>
            <Stack alignItems="center" gap={inube.spacing.s100}>
              <Text
                appearance="primary"
                type="headline"
                size={isMobile ? "small" : "medium"}
              >
                {availablePercentage}%
              </Text>
              <Text size={isMobile ? "small" : "medium"}>
                / Ingreso B. {incomeB === 0 ? "$ 0" : currencyFormat(incomeB)}
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="110px">
            <Text size={isMobile ? "small" : "medium"}>% Usado</Text>
          </Stack>
          <Stack>
            <Text
              appearance="primary"
              type="headline"
              size={isMobile ? "small" : "medium"}
            >
              {percentageUsed} %
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </CardInfoContainer>
  );
}
