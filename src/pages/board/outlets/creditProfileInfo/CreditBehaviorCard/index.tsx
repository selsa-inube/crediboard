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
  isMobile?: boolean;
}

export function CreditBehavior(props: CreditBehaviorProps) {
  const {
    centralScoreRisky,
    centralScoreDate,
    numberInternalBlackberries,
    maximumNumberInstallmentsArrears,
    isMobile,
  } = props;
  return (
    <CardInfoContainer
      title="Comportamiento crediticio"
      icon={<MdTrendingUp />}
      heightCardInfoContainer={isMobile ? "126px" : "246px"}
      isMobile={isMobile}
    >
      <Stack
        direction="column"
        gap={isMobile ? inube.spacing.s075 : inube.spacing.s200}
      >
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width={isMobile ? "120px" : "170px"}>
            <Text size={isMobile ? "small" : "medium"}>
              Score central de riesgo
            </Text>
          </Stack>
          <Stack alignItems="center" gap={inube.spacing.s100}>
            <Text
              appearance="primary"
              type="headline"
              size={isMobile ? "small" : "medium"}
            >
              {centralScoreRisky}
            </Text>
            <Text size={isMobile ? "small" : "medium"}>
              / {formatDateWithFullYear(centralScoreDate)}
            </Text>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width={isMobile ? "120px" : "170px"}>
            <Text size={isMobile ? "small" : "medium"}>
              Número de moras internas
            </Text>
          </Stack>
          <Stack>
            <Text
              appearance="primary"
              type="headline"
              size={isMobile ? "small" : "medium"}
            >
              {numberInternalBlackberries}
            </Text>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width={isMobile ? "120px" : "170px"}>
            <Text size={isMobile ? "small" : "medium"}>
              Máximo de número de cuotas en mora
            </Text>
          </Stack>
          <Stack>
            <Text
              appearance="primary"
              type="headline"
              size={isMobile ? "small" : "medium"}
            >
              {maximumNumberInstallmentsArrears}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </CardInfoContainer>
  );
}
