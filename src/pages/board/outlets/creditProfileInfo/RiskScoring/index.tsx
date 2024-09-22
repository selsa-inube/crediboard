import { MdQueryStats } from "react-icons/md";
import { Stack } from "@inubekit/stack";
import { SkeletonLine } from "@inubekit/skeleton";
import { Text } from "@inubekit/text";

import { CardInfoContainer } from "@components/cards/CardInfoContainer";
import { StyledDivider } from "@components/cards/SummaryCard/styles";
import { IRiskScoringRangeRequered } from "@src/services/types";

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
    dataRiskScoringMax,
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
            <Stack justifyContent="end" width="100%">
              {isLoading ? (
                <SkeletonLine animated width="60px" />
              ) : (
                <>                
                  <Text
                    appearance="primary"
                    type="title"
                    size={dataWereObtained ? "small" : "large"}
                    disabled={dataWereObtained}
                  >
                    {dataWereObtained ? msgErrorService : seniorityScore}
                  </Text>
                  <Text>
                    / {dataRiskScoringMax?.seniority_score}
                  </Text>
                </>
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
            <Stack justifyContent="end" width="100%">
              {isLoading ? (
                <SkeletonLine animated width="60px" />
              ) : (
                <>
                
                  <Text
                    appearance="primary"
                    type="title"
                    size={dataWereObtained ? "small" : "large"}
                    disabled={dataWereObtained}
                  >
                    {dataWereObtained ? msgErrorService : riskCenterScore}
                  </Text>
                  <Text>
                    / {dataRiskScoringMax?.risk_center_score}
                  </Text>
                </>
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
            <Stack justifyContent="end" width="100%">
              {isLoading ? (
                <SkeletonLine animated width="60px" />
              ) : (
                <>
                
                  <Text
                    appearance="primary"
                    type="title"
                    size={dataWereObtained ? "small" : "large"}
                    disabled={dataWereObtained}
                  >
                    {dataWereObtained ? msgErrorService : jobStabilityIndexScore}
                  </Text>
                  <Text>
                    / {dataRiskScoringMax?.job_stability_index_score}
                  </Text>
                </>
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
            <Stack justifyContent="end" width="100%">
              {isLoading ? (
                <SkeletonLine animated width="60px" />
              ) : (
                <>
                
                  <Text
                    appearance="primary"
                    type="title"
                    size={dataWereObtained ? "small" : "large"}
                    disabled={dataWereObtained}
                  >
                    {dataWereObtained ? msgErrorService : maritalStatusScore}
                  </Text>
                  <Text>
                   / {dataRiskScoringMax?.marital_status_score}
                  </Text>
                </>
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
            {/* <Stack justifyContent={isMobile ? "end" : "center"} width="100%"> */}
            <Stack justifyContent="end" width="100%" alignItems="center">
              {isLoading ? (
                <SkeletonLine animated width="60px" />
              ) : (
                <>
                  <Text
                    appearance="primary"
                    type="title"
                    size={dataWereObtained ? "small" : "large"}
                    disabled={dataWereObtained}
                  >
                    {dataWereObtained ? msgErrorService : economicActivityScore} 
                  </Text>
                  <Text>
                    / {dataRiskScoringMax?.economic_activity_score}
                  </Text>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </CardInfoContainer>
  );
}
