import { MdQueryStats } from "react-icons/md";
import { inube, Stack, Text, SkeletonLine } from "@inube/design-system";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { StyledDivider } from "@components/cards/SummaryCard/styles";

interface RiskScoringProps {
  totalScore: number;
  minimumScore: number;
  seniority: number;
  seniorityScore: number;
  riskCenter: number;
  riskCenterScore: number;
  jobStabilityIndex: number;
  jobStabilityIndexScore: number;
  maritalStatusScore: number;
  economicActivityScore: number;
  maritalStatus: string;
  economicActivity: string;
  isLoading: boolean;
  isMobile?: boolean;
}

export function RiskScoring(props: RiskScoringProps) {
  const {
    totalScore,
    minimumScore,
    seniority,
    seniorityScore,
    riskCenter,
    riskCenterScore,
    jobStabilityIndex,
    jobStabilityIndexScore,
    maritalStatusScore,
    economicActivityScore,
    maritalStatus,
    economicActivity,
    isLoading,
    isMobile,
  } = props;

  const getMainGap = () => {
    if (isMobile) {
      return isLoading ? inube.spacing.s200 : inube.spacing.s050;
    } else {
      return isLoading ? inube.spacing.s350 : inube.spacing.s200;
    }
  };

  const getInnerGap = () => {
    if (isMobile) {
      return isLoading ? inube.spacing.s200 : inube.spacing.s050;
    } else {
      return isLoading ? inube.spacing.s250 : inube.spacing.s100;
    }
  };

  return (
    <CardInfoContainer
      title="Scoring de riesgo"
      icon={<MdQueryStats />}
      isMobile={isMobile}
    >
      <Stack direction="column" gap={getMainGap()}>
        <Stack alignItems="center" gap={inube.spacing.s400}>
          <Stack width="100px">
            {isLoading ? (
              <SkeletonLine animated width="100%" />
            ) : (
              <Text size={isMobile ? "small" : "medium"}>Puntaje total</Text>
            )}
          </Stack>
          <Stack alignItems="center" gap={inube.spacing.s100}>
            {isLoading ? (
              <SkeletonLine animated width="80px" />
            ) : (
              <Text
                appearance="primary"
                type="headline"
                size={isMobile ? "small" : "medium"}
              >
                {totalScore}
              </Text>
            )}
            {isLoading ? (
              <SkeletonLine animated width="80px" />
            ) : (
              <Text size={isMobile ? "small" : "medium"}>
                / mínimo {minimumScore}
              </Text>
            )}
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack direction="column" gap={getInnerGap()}>
          <Stack alignItems="center">
            <Stack width={isMobile ? "600px" : "500px"}>
              {isLoading ? (
                <SkeletonLine animated width="100%" />
              ) : (
                <Text size={isMobile ? "small" : "medium"}>
                  Antigüedad de {seniority} años
                </Text>
              )}
            </Stack>
            <Stack justifyContent={isMobile ? "end" : "center"} width="100%">
              {isLoading ? (
                <SkeletonLine animated width="60px" />
              ) : (
                <Text appearance="primary" type="title" size="large">
                  {seniorityScore}
                </Text>
              )}
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Stack width={isMobile ? "600px" : "500px"}>
              {isLoading ? (
                <SkeletonLine animated width="100%" />
              ) : (
                <Text size={isMobile ? "small" : "medium"}>
                  Central de riesgo de {riskCenter} P
                </Text>
              )}
            </Stack>
            <Stack justifyContent={isMobile ? "end" : "center"} width="100%">
              {isLoading ? (
                <SkeletonLine animated width="60px" />
              ) : (
                <Text appearance="primary" type="title" size="large">
                  {riskCenterScore}
                </Text>
              )}
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Stack width={isMobile ? "600px" : "500px"}>
              {isLoading ? (
                <SkeletonLine animated width="100%" />
              ) : (
                <Text size={isMobile ? "small" : "medium"}>
                  Indice de estabilidad laboral {jobStabilityIndex} P
                </Text>
              )}
            </Stack>
            <Stack justifyContent={isMobile ? "end" : "center"} width="100%">
              {isLoading ? (
                <SkeletonLine animated width="60px" />
              ) : (
                <Text appearance="primary" type="title" size="large">
                  {jobStabilityIndexScore}
                </Text>
              )}
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Stack width={isMobile ? "600px" : "500px"}>
              {isLoading ? (
                <SkeletonLine animated width="100%" />
              ) : (
                <Text size={isMobile ? "small" : "medium"}>
                  Estado civil - {maritalStatus}
                </Text>
              )}
            </Stack>
            <Stack justifyContent={isMobile ? "end" : "center"} width="100%">
              {isLoading ? (
                <SkeletonLine animated width="60px" />
              ) : (
                <Text appearance="primary" type="title" size="large">
                  {maritalStatusScore}
                </Text>
              )}
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Stack width={isMobile ? "600px" : "500px"}>
              {isLoading ? (
                <SkeletonLine animated width="100%" />
              ) : (
                <Text size={isMobile ? "small" : "medium"}>
                  Actividad economica - {economicActivity}
                </Text>
              )}
            </Stack>
            <Stack justifyContent={isMobile ? "end" : "center"} width="100%">
              {isLoading ? (
                <SkeletonLine animated width="60px" />
              ) : (
                <Text appearance="primary" type="title" size="large">
                  {economicActivityScore}
                </Text>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </CardInfoContainer>
  );
}
