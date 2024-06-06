import { MdOutlineRequestQuote } from "react-icons/md";
import { inube, Stack, Text } from "@inube/design-system";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { StyledDivider } from "@components/cards/SummaryCard/styles";
import { currencyFormat } from "@utils/formatData/currency";

interface OpenWalletProps {
  overdraftFactor: number;
  valueDiscovered: number;
  reciprocity: number;
}

export function OpenWallet(props: OpenWalletProps) {
  const { overdraftFactor, valueDiscovered, reciprocity } = props;
  return (
    <CardInfoContainer
      title="Cartera descubierta"
      icon={<MdOutlineRequestQuote />}
      heightCardInfoContainer="182px"
    >
      <Stack direction="column" gap={inube.spacing.s200}>
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="150px">
            <Text size="medium">Factor de descubierto</Text>
          </Stack>
          <Stack>
            <Stack alignItems="center" gap={inube.spacing.s100}>
              <Text appearance="primary" type="headline" size="medium">
                {overdraftFactor}
              </Text>
              <Text size="medium">veces sus ingresos B</Text>
            </Stack>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="150px">
            <Text size="medium">Valor descubierto</Text>
          </Stack>
          <Stack>
            <Text appearance="primary" type="headline" size="medium">
              {currencyFormat(valueDiscovered)}
            </Text>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="150px">
            <Text size="medium">Reciprocidad</Text>
          </Stack>
          <Stack>
            <Stack alignItems="center" gap={inube.spacing.s100}>
              <Text appearance="primary" type="headline" size="medium">
                {reciprocity}
              </Text>
              <Text size="medium">veces sus Dep. Permanentes</Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </CardInfoContainer>
  );
}
