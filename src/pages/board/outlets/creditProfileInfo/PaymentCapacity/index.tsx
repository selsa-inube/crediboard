import { MdOutlinePaid } from "react-icons/md";
import { Stack, Text } from "@inubekit/inubekit";

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
  dataPaymentcapacity: boolean;
  setPaymentcapacity: (stade: boolean) => void;
}

export function PaymentCapacity(props: PaymentCapacityProps) {
  const {
    availableValue,
    availablePercentage,
    incomeB,
    percentageUsed,
    isMobile,
    dataPaymentcapacity,
    setPaymentcapacity,
  } = props;

  const handleRetry = () => {
    setPaymentcapacity(false);
  };

  return (
    <CardInfoContainer
      title="Capacidad de pago"
      icon={<MdOutlinePaid />}
      isMobile={isMobile}
    >
      {dataPaymentcapacity ? (
        <ItemNotFound
          image={userNotFound}
          title="Datos no encontrados"
          description="No pudimos obtener los datos solicitados."
          buttonDescription="Reintentar"
          route="#"
          onRetry={handleRetry}
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
