import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  MdClear,
  MdOutlineVisibility,
  MdInfoOutline,
  MdOutlineAttachMoney,
  MdErrorOutline,
} from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { inube } from "@inubekit/foundations";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Blanket } from "@inubekit/blanket";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Textfield } from "@inubekit/textfield";
import { SkeletonLine } from "@inubekit/skeleton";
import { currencyFormat } from "@utils/formatData/currency";

import { incomeModalConfig } from "./IcomeModalConfig";
import { StyledContainerClose, StyledModal, StyledDivider } from "./styles";
import { IncomeModalProps } from "./interface";

export const IncomeModal = (props: IncomeModalProps) => {
  const {
    title,
    portalId,
    handleClose,
    reportedIncomeSources,
    reportedFinancialObligations,
    subsistenceReserve,
    availableForNewCommitments,
    maxVacationTerm,
    maxAmount,
  } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. Ensure the portal has been set correctly."
    );
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setError(false);
      setLoading(false);
    }, 2000);
  }, []);

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
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

        <StyledDivider />

        {error ? (
          <Stack direction="column" alignItems="center" padding="16px">
            <Icon icon={<MdErrorOutline />} size="32px" appearance="danger" />
            <Text size="large" weight="bold" appearance="danger">
              {incomeModalConfig.error.title}
            </Text>
            <Text size="small" appearance="dark" textAlign="center">
              {incomeModalConfig.error.message}
            </Text>
          </Stack>
        ) : (
          <Stack direction="column">
            <Stack padding="8px 0px" justifyContent="space-between">
              <Text appearance="dark" size="large" weight="bold">
                {incomeModalConfig.incomeSources.label}
              </Text>

              <Stack alignItems="center">
                <Text appearance="success">$</Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text>{currencyFormat(reportedIncomeSources, false)}</Text>
                )}
                <Stack margin="0px 0px 0px 5px">
                  <Icon
                    appearance="primary"
                    icon={<MdOutlineVisibility />}
                    size="16px"
                    spacing="none"
                    cursorHover
                    variant="filled"
                    shape="circle"
                  />
                </Stack>
              </Stack>
            </Stack>

            <Stack padding="8px 0px" justifyContent="space-between">
              <Text appearance="gray" size="large" weight="bold">
                {incomeModalConfig.financialObligations.label}
              </Text>

              <Stack alignItems="center">
                <Text appearance="success">$</Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text>
                    {currencyFormat(reportedFinancialObligations, false)}
                  </Text>
                )}
                <Stack margin="0px 0px 0px 5px">
                  <Icon
                    appearance="primary"
                    icon={<MdOutlineVisibility />}
                    size="16px"
                    spacing="none"
                    cursorHover
                    variant="filled"
                    shape="circle"
                  />
                </Stack>
              </Stack>
            </Stack>

            <Stack padding="8px 0px" justifyContent="space-between">
              <Text appearance="gray" size="large" weight="bold">
                {incomeModalConfig.subsistenceReserve.label}
              </Text>

              <Stack alignItems="center">
                <Text appearance="success">$</Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text>{currencyFormat(subsistenceReserve, false)}</Text>
                )}
              </Stack>
            </Stack>

            <StyledDivider />

            <Stack padding="8px 0px" justifyContent="space-between">
              <Text appearance="dark" size="large" weight="bold">
                {incomeModalConfig.availableCommitments.label}
              </Text>

              <Stack>
                <Text appearance="success">$</Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text>
                    {currencyFormat(availableForNewCommitments, false)}
                  </Text>
                )}
              </Stack>
            </Stack>

            <Stack padding="8px 0px" justifyContent="space-between">
              <Text appearance="dark" size="large" weight="bold">
                {incomeModalConfig.maxVacationTerm.label}
              </Text>

              {loading ? (
                <SkeletonLine width="70px" animated={true} />
              ) : (
                <Text>{maxVacationTerm}</Text>
              )}
            </Stack>

            <StyledDivider />

            <Stack alignItems="center" margin="10px 0px">
              <Icon
                appearance="primary"
                icon={<MdInfoOutline />}
                size="16px"
                spacing="none"
              />
              <Text margin="5px" size="small">
                {incomeModalConfig.infoText}
              </Text>
            </Stack>

            <Stack padding="8px 0px" justifyContent="space-between">
              <Textfield
                value={
                  loading ? "loading..." : currencyFormat(maxAmount, false)
                }
                iconBefore={
                  <MdOutlineAttachMoney
                    color={inube.icon.dark.content.color.regular}
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

        <StyledDivider />

        <Stack gap="8px" justifyContent="end">
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
    </Blanket>,
    node
  );
};
