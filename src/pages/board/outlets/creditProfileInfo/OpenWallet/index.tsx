import { MdOutlineRequestQuote } from "react-icons/md";
import { Stack, Text } from "@inubekit/inubekit";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { StyledDivider } from "@components/cards/SummaryCard/styles";
import { currencyFormat } from "@utils/formatData/currency";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import userNotFound from "@assets/images/ItemNotFound.png";

interface OpenWalletProps {
  overdraftFactor: number;
  valueDiscovered: number;
  reciprocity: number;
  isMobile?: boolean;
  dataUncoveredWallet: boolean;
  setUncoveredWallet: (stade: boolean) => void;
}

export function OpenWallet(props: OpenWalletProps) {
  const {
    overdraftFactor,
    valueDiscovered,
    reciprocity,
    isMobile,
    dataUncoveredWallet,
    setUncoveredWallet,
  } = props;

  const handleRetry = () => {
    setUncoveredWallet(false);
  };

  
  return (
    <CardInfoContainer
      title="Cartera descubierta"
      icon={<MdOutlineRequestQuote />}
      isMobile={isMobile}
    >
      {dataUncoveredWallet ? (
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
            <Stack width={isMobile ? "110px" : "150px"}>
              <Text size={isMobile ? "small" : "medium"}>
                Factor de descubierto
              </Text>
            </Stack>
            <Stack>
              <Stack alignItems="center" gap="8px">
                <Text
                  appearance="primary"
                  type="headline"
                  size={isMobile ? "small" : "medium"}
                >
                  {overdraftFactor}
                </Text>
                <Text size={isMobile ? "small" : "medium"}>
                  veces sus ingresos B
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <StyledDivider />
          <Stack alignItems="center" gap="32px">
            <Stack width={isMobile ? "110px" : "150px"}>
              <Text size={isMobile ? "small" : "medium"}>
                Valor descubierto
              </Text>
            </Stack>
            <Stack>
              <Text
                appearance="primary"
                type="headline"
                size={isMobile ? "small" : "medium"}
              >
                {currencyFormat(valueDiscovered)}
              </Text>
            </Stack>
          </Stack>
          <StyledDivider />
          <Stack alignItems="center" gap="32px">
            <Stack width={isMobile ? "120px" : "150px"}>
              <Text size={isMobile ? "small" : "medium"}>Reciprocidad</Text>
            </Stack>
            <Stack>
              <Stack alignItems="center" gap="8px">
                <Text
                  appearance="primary"
                  type="headline"
                  size={isMobile ? "small" : "medium"}
                >
                  {reciprocity}
                </Text>
                <Text size={isMobile ? "small" : "medium"}>
                  veces sus Dep. Permanentes
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </CardInfoContainer>
  );
}
