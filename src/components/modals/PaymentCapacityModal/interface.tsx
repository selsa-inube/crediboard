import { forwardRef } from "react";
import {
  MdClear,
  MdOutlineVisibility,
  MdInfoOutline,
  MdOutlineAttachMoney,
  MdErrorOutline,
} from "react-icons/md";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";
import { SkeletonLine } from "@inubekit/skeleton";
import { currencyFormat } from "@utils/formatData/currency";
import { incomeModalConfig } from "./IcomeModalConfig";
import { inube } from "@inubekit/foundations";
import { Textfield } from "@inubekit/textfield";
import { StyledContainerClose, StyledModal } from "./styles";

interface PaymentCapacityInterfaceProps {
  loading: boolean;
  error: boolean;
  handleClose: () => void;
  title: string;
  isMobile: boolean;
  reportedIncomeSources: number;
  reportedFinancialObligations: number;
  subsistenceReserve: number;
  availableForNewCommitments: number;
  maxVacationTerm: number;
  maxAmount: number;
}

export const PaymentCapacityInterface = forwardRef<
  HTMLDivElement,
  PaymentCapacityInterfaceProps
>((props, ref) => {
  const {
    loading,
    error,
    handleClose,
    title,
    isMobile,
    reportedIncomeSources,
    reportedFinancialObligations,
    subsistenceReserve,
    availableForNewCommitments,
    maxVacationTerm,
    maxAmount,
  } = props;

  return (
    <StyledModal $smallScreen={isMobile} ref={ref}>
      <Stack justifyContent="space-between">
        <Text type="headline" size="small" appearance="dark">
          {title}
        </Text>
        <StyledContainerClose onClick={handleClose}>
          <Stack alignItems="center" gap="5px">
            <Text>{incomeModalConfig.closeButton.text}</Text>
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

      {error ? (
        <Stack direction="column" alignItems="center">
          <Icon icon={<MdErrorOutline />} size="32px" appearance="danger" />
          <Text size="large" weight="bold" appearance="danger">
            {incomeModalConfig.error.title}
          </Text>
          <Text size="small" appearance="dark" textAlign="center">
            {incomeModalConfig.error.message}
          </Text>
        </Stack>
      ) : (
        <Stack direction="column" gap="24px">
          <Stack direction="column" gap="12px">
            <Stack justifyContent="space-between" alignItems="center">
              <Text appearance="dark" size="large" weight="bold" type="label">
                {incomeModalConfig.incomeSources.label}
              </Text>

              <Stack alignItems="center">
                <Text appearance="success">$</Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text type="body" size="medium">
                    {currencyFormat(reportedIncomeSources, false)}
                  </Text>
                )}
                <Stack margin="0px 0px 0px 6px">
                  <Icon
                    appearance="primary"
                    icon={<MdOutlineVisibility />}
                    size="12px"
                    spacing="wide"
                    cursorHover
                    variant="filled"
                    shape="circle"
                  />
                </Stack>
              </Stack>
            </Stack>

            <Stack justifyContent="space-between">
              <Text appearance="gray" size="large" weight="bold" type="label">
                {incomeModalConfig.financialObligations.label}
              </Text>

              <Stack alignItems="center">
                <Text appearance="success">$</Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text type="body" size="medium">
                    {currencyFormat(reportedFinancialObligations, false)}
                  </Text>
                )}
                <Stack margin="0px 0px 0px 6px">
                  <Icon
                    appearance="primary"
                    icon={<MdOutlineVisibility />}
                    size="12px"
                    spacing="wide"
                    cursorHover
                    variant="filled"
                    shape="circle"
                  />
                </Stack>
              </Stack>
            </Stack>

            <Stack justifyContent="space-between">
              <Text appearance="gray" size="large" weight="bold" type="label">
                {incomeModalConfig.subsistenceReserve.label}
              </Text>

              <Stack alignItems="center">
                <Text appearance="success">$</Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text type="body" size="medium">
                    {currencyFormat(subsistenceReserve, false)}
                  </Text>
                )}
              </Stack>
            </Stack>
          </Stack>

          <Divider />

          <Stack direction="column" gap="12px">
            <Stack justifyContent="space-between">
              <Text appearance="dark" size="large" weight="bold" type="label">
                {incomeModalConfig.availableCommitments.label}
              </Text>

              <Stack alignItems="center">
                <Text appearance="success">$</Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text type="body" size="medium">
                    {currencyFormat(availableForNewCommitments, false)}
                  </Text>
                )}
              </Stack>
            </Stack>

            <Stack justifyContent="space-between">
              <Text appearance="dark" size="large" weight="bold" type="label">
                {incomeModalConfig.maxVacationTerm.label}
              </Text>

              {loading ? (
                <SkeletonLine width="70px" animated={true} />
              ) : (
                <Text type="body" size="medium">
                  {maxVacationTerm}
                </Text>
              )}
            </Stack>
          </Stack>

          <Divider />

          <Stack alignItems="center">
            <Icon
              appearance="primary"
              icon={<MdInfoOutline />}
              size="16px"
              spacing="wide"
            />
            <Text margin="0px 5px" size="small" type="body">
              {incomeModalConfig.infoText}
            </Text>
          </Stack>

          <Stack justifyContent="space-between">
            <Textfield
              value={loading ? "loading..." : currencyFormat(maxAmount, false)}
              iconBefore={
                <MdOutlineAttachMoney
                  color={inube.palette.neutral.N900}
                />
              }
              fullwidth={true}
              id="id"
              label={incomeModalConfig.textfield.label}
              name="name"
              placeholder={incomeModalConfig.textfield.placeholder}
              disabled={loading}
            />
          </Stack>
        </Stack>
      )}

      <Divider />

      <Stack gap="20px" justifyContent="end">
        <Button
          onClick={handleClose}
          variant="outlined"
          appearance="gray"
          fullwidth={isMobile}
        >
          {incomeModalConfig.buttons.close}
        </Button>
        <Button
          onClick={() => alert("Recalculando...")}
          variant="filled"
          appearance="primary"
          fullwidth={isMobile}
        >
          {incomeModalConfig.buttons.recalculate}
        </Button>
      </Stack>
    </StyledModal>
  );
});
