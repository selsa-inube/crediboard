import { createPortal } from "react-dom";
import { MdClear, MdQueryStats } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Blanket } from "@inubekit/blanket";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";
import { SkeletonLine } from "@inubekit/skeleton";

import { currencyFormat } from "@utils/formatData/currency";

import { frcConfig } from "./FrcConfig";
import { StyledContainerClose, StyledModal } from "./styles";

export interface ScoreModalProps {
  title: string;
  handleClose: () => void;
  subTitle: string;
  portalId?: string;
  totalScore: number;
  seniority: number;
  centralRisk: number;
  employmentStability: number;
  maritalStatus: number;
  economicActivity: number;
  monthlyIncome: number;
  maxIndebtedness: number;
  loading?: boolean;
}

export const ScoreModal = (props: ScoreModalProps) => {
  const {
    portalId,
    handleClose,
    totalScore,
    seniority,
    centralRisk,
    employmentStability,
    maritalStatus,
    economicActivity,
    monthlyIncome,
    maxIndebtedness,
    loading,
  } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error("Portal node not found.");
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack justifyContent="space-between" alignItems="center">
          <Text type="headline" size="small" appearance="dark">
            {frcConfig.title}
          </Text>
          <StyledContainerClose onClick={handleClose}>
            <Stack alignItems="center" gap="5px">
              <Text>{frcConfig.closeBtn}</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </Stack>
        <Divider />
        <Stack direction="column" gap="16px">
          <Stack direction="column" gap="12px">
            <Stack gap="8px" alignItems="center">
              <Icon
                appearance="primary"
                icon={<MdQueryStats />}
                disabled={false}
                size="34px"
              />
              <Text appearance="primary" size="large" type="title">
                {frcConfig.subTitle}
              </Text>
            </Stack>
            <Divider />
            <Stack justifyContent="space-between" alignItems="center">
              <Text appearance="dark" size="large" weight="bold" type="label">
                {frcConfig.totalScoreLabel}
              </Text>
              {loading ? (
                <SkeletonLine width="70px" animated={true} />
              ) : (
                <Stack>
                  <Text
                    appearance="primary"
                    weight="bold"
                    type="body"
                    size="large"
                  >
                    {totalScore}
                  </Text>
                  <Text weight="bold" type="body" size="large">
                    {frcConfig.totalScoreMax}
                  </Text>
                </Stack>
              )}
            </Stack>
            <Divider />
            <Stack justifyContent="space-between" alignItems="center">
              <Text weight="bold" size="large" type="label">
                {frcConfig.seniorityLabel}
              </Text>
              {loading ? (
                <SkeletonLine width="70px" animated={true} />
              ) : (
                <Stack>
                  <Text appearance="primary" weight="bold" size="large">
                    {seniority}
                  </Text>
                  <Text weight="bold" type="body" size="large">
                    {frcConfig.seniorityMax}
                  </Text>
                </Stack>
              )}
            </Stack>
            <Stack justifyContent="space-between" alignItems="center">
              <Text weight="bold" size="large" type="label">
                {frcConfig.centralRiskLabel}
              </Text>
              {loading ? (
                <SkeletonLine width="70px" animated={true} />
              ) : (
                <Stack>
                  <Text appearance="primary" weight="bold" size="large">
                    {centralRisk}
                  </Text>
                  <Text weight="bold" type="body" size="large">
                    {frcConfig.centralRiskMax}
                  </Text>
                </Stack>
              )}
            </Stack>
            <Stack justifyContent="space-between" alignItems="center">
              <Text weight="bold" size="large" type="label">
                {frcConfig.employmentStabilityLabel}
              </Text>
              {loading ? (
                <SkeletonLine width="70px" animated={true} />
              ) : (
                <Stack>
                  <Text appearance="primary" weight="bold" size="large">
                    {employmentStability}
                  </Text>
                  <Text weight="bold" type="body" size="large">
                    {frcConfig.employmentStabilityMax}
                  </Text>
                </Stack>
              )}
            </Stack>
            <Stack justifyContent="space-between" alignItems="center">
              <Text weight="bold" size="large" type="label">
                {frcConfig.maritalStatusLabel}
              </Text>
              {loading ? (
                <SkeletonLine width="70px" animated={true} />
              ) : (
                <Stack>
                  <Text appearance="primary" weight="bold" size="large">
                    {maritalStatus}
                  </Text>
                  <Text weight="bold" type="body" size="large">
                    {frcConfig.maritalStatusMax}
                  </Text>
                </Stack>
              )}
            </Stack>
            <Stack justifyContent="space-between" alignItems="center">
              <Text weight="bold" size="large" type="label">
                {frcConfig.economicActivityLabel}
              </Text>
              {loading ? (
                <SkeletonLine width="70px" animated={true} />
              ) : (
                <Stack>
                  <Text appearance="primary" weight="bold" size="large">
                    {economicActivity}
                  </Text>
                  <Text weight="bold" type="body" size="large">
                    {frcConfig.economicActivityMax}
                  </Text>
                </Stack>
              )}
            </Stack>
          </Stack>
          <Divider />
          <Stack justifyContent="space-between">
            <Text weight="bold" size="large" type="label">
              {frcConfig.incomesLabel}
            </Text>
            <Stack>
              <Text appearance="success">$</Text>
              {loading ? (
                <SkeletonLine width="70px" animated={true} />
              ) : (
                <Text>{currencyFormat(monthlyIncome, false)}</Text>
              )}
            </Stack>
          </Stack>
          <Stack justifyContent="space-between" alignItems="center">
            <Text weight="bold" size="large" type="label">
              {frcConfig.timesIncome}
            </Text>
            {loading ? (
              <SkeletonLine width="70px" animated={true} />
            ) : (
              <Text weight="bold" type="body" size="large">
                5
              </Text>
            )}
          </Stack>
          <Divider />
          <Stack alignItems="center" direction="column" gap="8px">
            {loading ? (
              <Text
                appearance="primary"
                weight="bold"
                type="headline"
                size="large"
              >
                {frcConfig.loading}
              </Text>
            ) : (
              <Text
                appearance="primary"
                weight="bold"
                type="headline"
                size="large"
              >
                ${currencyFormat(maxIndebtedness, false)}
              </Text>
            )}
            <Stack>
              <Text appearance="gray" size="small" textAlign="center">
                {frcConfig.maxIndebtedness}
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack gap="8px" justifyContent="end">
          <Button
            onClick={handleClose}
            appearance="primary"
            fullwidth={isMobile}
          >
            {frcConfig.closeBtn}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
};
