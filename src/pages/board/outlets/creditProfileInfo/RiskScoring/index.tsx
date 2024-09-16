import { MdQueryStats } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { SkeletonLine } from "@inubekit/skeleton";
import { Text } from "@inubekit/text";

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
  dataWereObtained: boolean;
}

const msgErrorService = "Error: No encontrado";

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
      <Stack direction="column" gap={getMainGap()}>
        <Stack alignItems="center" gap="32px">
          <Stack width="100px">
            {isLoading ? (
              <SkeletonLine animated width="100%" />
            ) : (
              <Text
                size={isMobile ? "small" : "medium"}
                disabled={dataWereObtained}
              >
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
                type={dataWereObtained ? "body" : "headline"}
                size={isMobile || dataWereObtained ? "small" : "medium"}
                disabled={dataWereObtained}
              >
                {dataWereObtained ? msgErrorService : totalScore}
              </Text>
            )}
            {isLoading ? (
              <SkeletonLine animated width="80px" />
            ) : (
              <Text
                size={isMobile || dataWereObtained ? "small" : "medium"}
                disabled={dataWereObtained}
              >
                {dataWereObtained
                  ? msgErrorService
                  : `/ mínimo ${minimumScore}`}
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
                <Text
                  size={isMobile ? "small" : "medium"}
                  disabled={dataWereObtained}
                >
                  {dataWereObtained
                    ? msgErrorService
                    : `Antigüedad de ${seniority} años`}
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
                  size={dataWereObtained ? "small" : "large"}
                  disabled={dataWereObtained}
                >
                  {dataWereObtained ? msgErrorService : seniorityScore}
                </Text>
              )}
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Stack width={isMobile ? "600px" : "500px"}>
              {isLoading ? (
                <SkeletonLine animated width="100%" />
              ) : (
                <Text
                  size={isMobile ? "small" : "medium"}
                  disabled={dataWereObtained}
                >
                  {dataWereObtained
                    ? msgErrorService
                    : `Central de riesgo de ${riskCenter} P`}
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
                  size={dataWereObtained ? "small" : "large"}
                  disabled={dataWereObtained}
                >
                  {dataWereObtained ? msgErrorService : riskCenterScore}
                </Text>
              )}
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Stack width={isMobile ? "600px" : "500px"}>
              {isLoading ? (
                <SkeletonLine animated width="100%" />
              ) : (
                <Text
                  size={isMobile ? "small" : "medium"}
                  disabled={dataWereObtained}
                >
                  {dataWereObtained
                    ? msgErrorService
                    : `Indice de estabilidad laboral ${jobStabilityIndex} P`}
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
                  size={dataWereObtained ? "small" : "large"}
                  disabled={dataWereObtained}
                >
                  {dataWereObtained ? msgErrorService : jobStabilityIndexScore}
                </Text>
              )}
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Stack width={isMobile ? "600px" : "500px"}>
              {isLoading ? (
                <SkeletonLine animated width="100%" />
              ) : (
                <Text
                  size={isMobile ? "small" : "medium"}
                  disabled={dataWereObtained}
                >
                  {dataWereObtained
                    ? msgErrorService
                    : `Estado civil - ${maritalStatus}`}
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
                  size={dataWereObtained ? "small" : "large"}
                  disabled={dataWereObtained}
                >
                  {dataWereObtained ? msgErrorService : maritalStatusScore}
                </Text>
              )}
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Stack width={isMobile ? "600px" : "500px"}>
              {isLoading ? (
                <SkeletonLine animated width="100%" />
              ) : (
                <Text
                  size={isMobile ? "small" : "medium"}
                  disabled={dataWereObtained}
                >
                  {dataWereObtained
                    ? msgErrorService
                    : `Actividad economica - ${economicActivity}`}
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
                  size={dataWereObtained ? "small" : "large"}
                  disabled={dataWereObtained}
                >
                  {dataWereObtained ? msgErrorService : economicActivityScore}
                </Text>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </CardInfoContainer>
  );
}
