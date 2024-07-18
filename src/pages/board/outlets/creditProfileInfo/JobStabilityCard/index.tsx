import { MdOutlineBusinessCenter } from "react-icons/md";
import { inube, Stack, Text } from "@inube/design-system";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { StyledDivider } from "@components/cards/SummaryCard/styles";
import { currencyFormat } from "@utils/formatData/currency";

interface JobStabilityCardProps {
  companySeniority: number;
  stabilityIndex: number;
  estimatedCompensation: number;
}

export function JobStabilityCard(props: JobStabilityCardProps) {
  const { companySeniority, stabilityIndex, estimatedCompensation } = props;
  return (
    <CardInfoContainer
      title="Estabilidad Laboral"
      icon={<MdOutlineBusinessCenter />}
      heightCardInfoContainer="182px"
    >
      <Stack direction="column" gap={inube.spacing.s200}>
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="170px">
            <Text size="medium">Antigüedad en la empresa</Text>
          </Stack>
          <Stack>
            <Text appearance="primary" type="headline" size="medium">
              {companySeniority} años
            </Text>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="170px">
            <Text size="medium">Indice de estabilidad laboral</Text>
          </Stack>
          <Stack>
            <Stack alignItems="center" gap={inube.spacing.s100}>
              <Text appearance="primary" type="headline" size="medium">
                {stabilityIndex}
              </Text>
              <Text size="medium">/1000</Text>
            </Stack>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="170px">
            <Text size="medium">Indemnización estimada</Text>
          </Stack>
          <Stack>
            <Text appearance="primary" type="headline" size="medium">
              {estimatedCompensation === 0
                ? "$ 0"
                : currencyFormat(estimatedCompensation)}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </CardInfoContainer>
  );
}
