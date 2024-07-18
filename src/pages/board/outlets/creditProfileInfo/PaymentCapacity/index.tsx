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
}

export function PaymentCapacity(props: PaymentCapacityProps) {
  const { availableValue, availablePercentage, incomeB, percentageUsed } =
    props;
  return (
    <CardInfoContainer
      title="Capacidad de pago"
      icon={<MdOutlinePaid />}
      heightCardInfoContainer="182px"
    >
      <Stack direction="column" gap={inube.spacing.s200}>
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="100px">
            <Text size="medium">Valor disponible</Text>
          </Stack>
          <Stack>
            <Text appearance="primary" type="headline" size="medium">
              {availableValue === 0 ? "$ 0" : currencyFormat(availableValue)}
            </Text>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="100px">
            <Text size="medium">% Disponible</Text>
          </Stack>
          <Stack>
            <Stack alignItems="center" gap={inube.spacing.s100}>
              <Text appearance="primary" type="headline" size="medium">
                {availablePercentage}%
              </Text>
              <Text size="medium">
                / Ingreso B. {incomeB === 0 ? "$ 0" : currencyFormat(incomeB)}
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="100px">
            <Text size="medium">% Usado</Text>
          </Stack>
          <Stack>
            <Text appearance="primary" type="headline" size="medium">
              {percentageUsed} %
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </CardInfoContainer>
  );
}
