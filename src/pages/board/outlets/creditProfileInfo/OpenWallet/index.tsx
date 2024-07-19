import { MdOutlineRequestQuote } from "react-icons/md";
import { inube, Stack, Text } from "@inube/design-system";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { StyledDivider } from "@components/cards/SummaryCard/styles";
import { currencyFormat } from "@utils/formatData/currency";

interface OpenWalletProps {
  overdraftFactor: number;
  valueDiscovered: number;
  reciprocity: number;
  isMobile?: boolean;
}

export function OpenWallet(props: OpenWalletProps) {
  const { overdraftFactor, valueDiscovered, reciprocity, isMobile } = props;
  return (
    <CardInfoContainer
      title="Cartera descubierta"
      icon={<MdOutlineRequestQuote />}
      isMobile={isMobile}
    >
      <Stack
        direction="column"
        gap={isMobile ? inube.spacing.s075 : inube.spacing.s200}
      >
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width={isMobile ? "110px" : "150px"}>
            <Text size={isMobile ? "small" : "medium"}>
              Factor de descubierto
            </Text>
          </Stack>
          <Stack>
            <Stack alignItems="center" gap={inube.spacing.s100}>
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
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width={isMobile ? "110px" : "150px"}>
            <Text size={isMobile ? "small" : "medium"}>Valor descubierto</Text>
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
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width={isMobile ? "120px" : "150px"}>
            <Text size={isMobile ? "small" : "medium"}>Reciprocidad</Text>
          </Stack>
          <Stack>
            <Stack alignItems="center" gap={inube.spacing.s100}>
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
    </CardInfoContainer>
  );
}
