import { MdQueryStats } from "react-icons/md";
import { inube, Stack, Text } from "@inube/design-system";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { StyledDivider } from "@components/cards/SummaryCard/styles";

interface RiskScoringProps {
  totalScore: number;
  minimumScore: number;
  yearsOldScore: number;
  riskCenterScore: number;
  jobStabilityIndexScore: number;
  maritalStatusScore: number;
  economicActivityScore: number;
  isMobile?: boolean;
}

export function RiskScoring(props: RiskScoringProps) {
  const {
    totalScore,
    minimumScore,
    yearsOldScore,
    riskCenterScore,
    jobStabilityIndexScore,
    maritalStatusScore,
    economicActivityScore,
    isMobile,
  } = props;
  return (
    <CardInfoContainer
      title="Scoring de riesgo"
      icon={<MdQueryStats />}
      heightCardInfoContainer={isMobile ? "196px" : "246px"}
      isMobile={isMobile}
    >
      <Stack
        direction="column"
        gap={isMobile ? inube.spacing.s050 : inube.spacing.s200}
      >
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="100px">
            <Text size={isMobile ? "small" : "medium"}>Puntaje total</Text>
          </Stack>
          <Stack alignItems="center" gap={inube.spacing.s100}>
            <Text
              appearance="primary"
              type="headline"
              size={isMobile ? "small" : "medium"}
            >
              {totalScore}
            </Text>
            <Text size={isMobile ? "small" : "medium"}>
              / mínimo {minimumScore}
            </Text>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack
          direction="column"
          gap={isMobile ? inube.spacing.s025 : inube.spacing.s100}
        >
          <Stack alignItems="center">
            <Stack width="500px">
              <Text size={isMobile ? "small" : "medium"}>
                Antigüedad de 10 años
              </Text>
            </Stack>
            <Stack justifyContent="center" width="100%">
              <Text appearance="primary" type="title" size="large">
                {yearsOldScore}
              </Text>
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Stack width="500px">
              <Text size={isMobile ? "small" : "medium"}>
                Central de riesgo de 250 P
              </Text>
            </Stack>
            <Stack justifyContent="center" width="100%">
              <Text appearance="primary" type="title" size="large">
                {riskCenterScore}
              </Text>
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Stack width="500px">
              <Text size={isMobile ? "small" : "medium"}>
                Indice de estabilidad laboral 900 P
              </Text>
            </Stack>
            <Stack justifyContent="center" width="100%">
              <Text appearance="primary" type="title" size="large">
                {jobStabilityIndexScore}
              </Text>
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Stack width="500px">
              <Text size={isMobile ? "small" : "medium"}>
                Estado civil - Casado
              </Text>
            </Stack>
            <Stack justifyContent="center" width="100%">
              <Text appearance="primary" type="title" size="large">
                {maritalStatusScore}
              </Text>
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Stack width="500px">
              <Text size={isMobile ? "small" : "medium"}>
                Actividad economica - Pensionado
              </Text>
            </Stack>
            <Stack justifyContent="center" width="100%">
              <Text appearance="primary" type="title" size="large">
                {economicActivityScore}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </CardInfoContainer>
  );
}
