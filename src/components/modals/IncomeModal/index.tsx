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
import { Divider } from "@inubekit/divider";
import { SkeletonLine } from "@inubekit/skeleton";
import { currencyFormat } from "@utils/formatData/currency";

import { incomeModalConfig } from "./IcomeModalConfig";
import { StyledContainerClose, StyledModal } from "./styles";
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
                      spacing="none"
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
                      spacing="none"
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

            <Stack  direction="column" gap="12px">
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
                spacing="none"
              />
              <Text margin="0px 5px" size="small" type="body">
                {incomeModalConfig.infoText}
              </Text>
            </Stack>

            <Stack justifyContent="space-between">
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

        <Divider />

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
