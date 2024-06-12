import { MdTrendingUp } from "react-icons/md";
import { inube, Stack, Text } from "@inube/design-system";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { StyledDivider } from "@components/cards/SummaryCard/styles";
import { formatDateWithFullYear } from "@utils/formatData/date";

interface CreditBehaviorProps {
  centralScoreRisky: number;
  centralScoreDate: string;
  numberInternalBlackberries: number;
  maximumNumberInstallmentsArrears: number;
}

export function CreditBehavior(props: CreditBehaviorProps) {
  const {
    centralScoreRisky,
    centralScoreDate,
    numberInternalBlackberries,
    maximumNumberInstallmentsArrears,
  } = props;
  return (
    <CardInfoContainer
      title="Comportamiento crediticio"
      icon={<MdTrendingUp />}
      heightCardInfoContainer="246px"
    >
      <Stack direction="column" gap={inube.spacing.s200}>
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="170px">
            <Text size="medium">Score central de riesgo</Text>
          </Stack>
          <Stack alignItems="center" gap={inube.spacing.s100}>
            <Text appearance="primary" type="headline" size="medium">
              {centralScoreRisky}
            </Text>
            <Text size="medium">
              / {formatDateWithFullYear(centralScoreDate)}
            </Text>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="170px">
            <Text size="medium">Número de moras internas</Text>
          </Stack>
          <Stack>
            <Text appearance="primary" type="headline" size="medium">
              {numberInternalBlackberries}
            </Text>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="170px">
            <Text size="medium">Máximo de número de cuotas en mora</Text>
          </Stack>
          <Stack>
            <Text appearance="primary" type="headline" size="medium">
              {maximumNumberInstallmentsArrears}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </CardInfoContainer>
  );
}
