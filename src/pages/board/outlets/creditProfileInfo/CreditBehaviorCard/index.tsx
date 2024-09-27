import { MdTrendingUp } from "react-icons/md";
import { Text } from "@inubekit/text";
import { Stack } from "@inubekit/stack";

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
      isMobile={isMobile}
    >
      <Stack
        direction="column"
        gap={isMobile ? "6px" : "16px"}
      >
        <Stack alignItems="center" gap="32px">
          <Stack width={isMobile ? "120px" : "170px"}>
            <Text size={isMobile ? "small" : "medium"}>
              Score central de riesgo
            </Text>
          </Stack>
          <Stack alignItems="center" gap="8px">
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
        <Stack alignItems="center" gap="32px">
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
        <Stack alignItems="center" gap="32px">
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
