import { MdOutlinePaid } from "react-icons/md";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { StyledDivider } from "@components/cards/SummaryCard/styles";
import { currencyFormat } from "@utils/formatData/currency";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import userNotFound from "@assets/images/ItemNotFound.png";

interface PaymentCapacityProps {
  availableValue: number;
  availablePercentage: number;
  incomeB: number;
  percentageUsed: number;
  isMobile?: boolean;
  dataWereObtained: boolean;
}

export function PaymentCapacity(props: PaymentCapacityProps) {
  const {
    availableValue,
    availablePercentage,
    incomeB,
    percentageUsed,
    isMobile,
    dataWereObtained,
  } = props;
  
  return (
    <CardInfoContainer
      title="Capacidad de pago"
      icon={<MdOutlinePaid />}
      isMobile={isMobile}
    >
      {dataWereObtained ? (
        <ItemNotFound
          image={userNotFound}
          title="Datos no encontrados"
          description="No pudimos obtener los datos solicitados."
          buttonDescription="Reintentar"
          route="#"
        />
      ) : (
        <Stack direction="column" gap={isMobile ? "6px" : "16px"}>
          <Stack alignItems="center" gap="32px">
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
          <Stack alignItems="center" gap="32px">
            <Stack width="110px">
              <Text size={isMobile ? "small" : "medium"}>% Disponible</Text>
            </Stack>
            <Stack>
              <Stack alignItems="center" gap="8px">
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
          <Stack alignItems="center" gap="32px">
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
      )}
    </CardInfoContainer>
  );
}
