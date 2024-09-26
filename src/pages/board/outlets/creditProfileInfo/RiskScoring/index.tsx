import { MdQueryStats } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { SkeletonLine } from "@inubekit/skeleton";
import { Text } from "@inubekit/text";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { IRiskScoringRangeRequered } from "@src/services/types";
import { ItemNotFound } from "@components/layout/ItemNotFound";
import { StyledDivider } from "@components/cards/SummaryCard/styles";
import userNotFound from "@assets/images/ItemNotFound.png";

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
  dataWereObtained: boolean;
  dataRiskScoringMax: IRiskScoringRangeRequered;
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
    dataWereObtained,
  } = props;

  const getMainGap = () => {
    if (isMobile) {
      return isLoading ? "16px" : "4px";
    } else {
      return isLoading ? "28px" : "16px";
    }
  };

  const getInnerGap = () => {
    if (isMobile) {
      return isLoading ? "16px" : "4px";
    } else {
      return isLoading ? "20px" : "8px";
    }
  };

  return (
    <CardInfoContainer
      title="Scoring de riesgo"
      icon={<MdQueryStats />}
      isMobile={isMobile}
    >
      {dataWereObtained ? (
        <ItemNotFound
          image={userNotFound}
          title="Datos no encontrados"
          description="No pudimos obtener los datos solicitados."
          buttonDescription="Reintentar"
          route="#"
        />
      ) : (
        <Stack direction="column" gap={getMainGap()}>
          <Stack alignItems="center" gap="32px">
            <Stack width="100px">
              {isLoading ? (
                <SkeletonLine animated width="100%" />
              ) : (
                <Text size={isMobile ? "small" : "medium"}>
                  Puntaje total
                </Text>
              )}
            </Stack>
            <Stack alignItems="center" gap="8px">
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
                  <Text
                    appearance="primary"
                    type="title"
                    size={isMobile ? "small" : "large"}
                  >
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
                  <Text
                    appearance="primary"
                    type="title"
                    size={isMobile ? "small" : "large"}
                  >
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
                    Índice de estabilidad laboral {jobStabilityIndex} P
                  </Text>
                )}
              </Stack>
              <Stack justifyContent={isMobile ? "end" : "center"} width="100%">
                {isLoading ? (
                  <SkeletonLine animated width="60px" />
                ) : (
                  <Text
                    appearance="primary"
                    type="title"
                    size={isMobile ? "small" : "large"}
                  >
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
                  <Text
                    appearance="primary"
                    type="title"
                    size={isMobile ? "small" : "large"}
                  >
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
                    Actividad económica - {economicActivity}
                  </Text>
                )}
              </Stack>
              <Stack justifyContent={isMobile ? "end" : "center"} width="100%">
                {isLoading ? (
                  <SkeletonLine animated width="60px" />
                ) : (
                  <Text
                    appearance="primary"
                    type="title"
                    size={isMobile ? "small" : "large"}
                  >
                    {economicActivityScore}
                  </Text>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </CardInfoContainer>
  );
}
