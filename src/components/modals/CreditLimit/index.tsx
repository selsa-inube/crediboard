import { createPortal } from "react-dom";
import {
  MdClear,
  MdOutlineVisibility,
  MdInfoOutline,
  MdCached,
} from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Blanket } from "@inubekit/blanket";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";
import { SkeletonLine } from "@inubekit/skeleton";

import { currencyFormat } from "@utils/formatData/currency";

import { creditLimitTexts } from "./creditLimitConfig";
import { StyledContainerClose, StyledModal, StyledList } from "./styles";

export interface ICreditLimitProps {
  title: string;
  maxPaymentCapacity: number;
  maxReciprocity: number;
  maxDebtFRC: number;
  assignedLimit: number;
  currentPortfolio: number;
  maxUsableLimit: number;
  availableLimitWithoutGuarantee: number;
  loading?: boolean;
  handleClose: () => void;
  onOpenPaymentCapacityModal?: () => void;
  onOpenReciprocityModal?: () => void;
  onOpenFrcModal?: () => void;
  portalId?: string;
}

export const CreditLimit = (props: ICreditLimitProps) => {
  const {
    title,
    loading,
    handleClose,
    onOpenPaymentCapacityModal,
    onOpenReciprocityModal,
    onOpenFrcModal,
    portalId,
    maxPaymentCapacity,
    maxReciprocity,
    maxDebtFRC,
    assignedLimit,
    currentPortfolio,
    maxUsableLimit,
    availableLimitWithoutGuarantee,
  } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  const isMobile = useMediaQuery("(max-width: 700px)");

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack justifyContent="space-between">
          <Text type="headline" size="small" appearance="dark">
            {title}
          </Text>
          <StyledContainerClose onClick={handleClose}>
            <Stack alignItems="center" gap="5px">
              <Text>{creditLimitTexts.close}</Text>
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
        <Stack direction="column" gap="24px">
          <StyledList>
            <Stack direction="column" gap="12px">
              <li>
                <Stack justifyContent="space-between">
                  <Text
                    appearance="dark"
                    size="large"
                    weight="bold"
                    type="label"
                  >
                    {creditLimitTexts.maxPaymentCapacity}
                  </Text>
                  <Stack alignItems="center">
                    <Text appearance="success">$</Text>
                    {loading ? (
                      <SkeletonLine width="70px" animated={true} />
                    ) : (
                      <Text type="body" size="medium" appearance="dark">
                        {currencyFormat(maxPaymentCapacity, false)}
                      </Text>
                    )}
                    <Stack margin="0px 0px 0px 5px">
                      <Icon
                        appearance="primary"
                        icon={<MdOutlineVisibility />}
                        size="16px"
                        spacing="narrow"
                        cursorHover={true}
                        variant="filled"
                        shape="circle"
                        onClick={onOpenPaymentCapacityModal}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </li>
              <li>
                <Stack justifyContent="space-between">
                  <Text
                    appearance="dark"
                    size="large"
                    weight="bold"
                    type="label"
                  >
                    {creditLimitTexts.maxReciprocity}
                  </Text>
                  <Stack alignItems="center">
                    <Text appearance="success">$</Text>
                    {loading ? (
                      <SkeletonLine width="70px" animated={true} />
                    ) : (
                      <Text type="body" size="medium" appearance="dark">
                        {currencyFormat(maxReciprocity, false)}
                      </Text>
                    )}
                    <Stack margin="0px 0px 0px 5px">
                      <Icon
                        appearance="primary"
                        icon={<MdOutlineVisibility />}
                        size="16px"
                        spacing="narrow"
                        cursorHover={true}
                        variant="filled"
                        shape="circle"
                        onClick={onOpenReciprocityModal}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </li>
              <li>
                <Stack justifyContent="space-between">
                  <Text
                    appearance="dark"
                    size="large"
                    weight="bold"
                    type="label"
                  >
                    {creditLimitTexts.maxDebtFRC}
                  </Text>
                  <Stack alignItems="center">
                    <Text appearance="success">$</Text>
                    {loading ? (
                      <SkeletonLine width="70px" animated={true} />
                    ) : (
                      <Text
                        weight="bold"
                        type="body"
                        size="medium"
                        appearance="dark"
                      >
                        {currencyFormat(maxDebtFRC, false)}
                      </Text>
                    )}
                    <Stack margin="0px 0px 0px 5px">
                      <Icon
                        appearance="primary"
                        icon={<MdOutlineVisibility />}
                        size="16px"
                        spacing="narrow"
                        cursorHover
                        variant="filled"
                        shape="circle"
                        onClick={onOpenFrcModal}
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </li>
              <li>
                <Stack justifyContent="space-between">
                  <Text
                    appearance="dark"
                    size="large"
                    weight="bold"
                    type="label"
                  >
                    {creditLimitTexts.assignedLimit}
                  </Text>
                  <Stack alignItems="center" gap="4px">
                    <Text appearance="success">$</Text>
                    {loading ? (
                      <SkeletonLine width="70px" animated={true} />
                    ) : (
                      <Text
                        weight="bold"
                        type="body"
                        size="medium"
                        appearance="dark"
                      >
                        {currencyFormat(assignedLimit, false)}
                      </Text>
                    )}
                  </Stack>
                </Stack>
              </li>
            </Stack>
          </StyledList>
          <Divider />
          <Stack alignItems="center">
            <Icon
              appearance="primary"
              icon={<MdInfoOutline />}
              size="16px"
              spacing="narrow"
            />
            <Text margin="0px 5px" size="small">
              {creditLimitTexts.maxUsableQuote}
            </Text>
          </Stack>
          <Stack direction="column" gap="12px">
            <Stack justifyContent="space-between">
              <Text weight="bold" type="label">
                {creditLimitTexts.maxUsableLimit}
              </Text>
              <Stack alignItems="center">
                <Text appearance="success">$</Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text type="body" size="medium" appearance="dark">
                    {currencyFormat(maxUsableLimit, false)}
                  </Text>
                )}
              </Stack>
            </Stack>
            <Stack justifyContent="space-between">
              <Text size="large" appearance="gray" weight="bold" type="label">
                {creditLimitTexts.currentPortfolio}
              </Text>
              <Stack alignItems="center">
                <Text appearance="success">$</Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text type="body" size="medium" appearance="dark">
                    {currencyFormat(currentPortfolio, false)}
                  </Text>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Stack justifyContent="space-between" gap="2px">
            <Text weight="bold" type="label">
              {creditLimitTexts.availableLimitWithoutGuarantee}
            </Text>
            <Stack justifyContent="space-between" alignItems="center">
              <Text appearance="success">$</Text>
              {loading ? (
                <SkeletonLine width="70px" animated={true} />
              ) : (
                <Text weight="bold" type="body" size="medium" appearance="dark">
                  {currencyFormat(availableLimitWithoutGuarantee, false)}
                </Text>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <Stack justifyContent="end">
          <Button
            onClick={handleClose}
            variant="filled"
            appearance="primary"
            fullwidth={isMobile}
            iconBefore={<MdCached />}
          >
            {creditLimitTexts.closeButton}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
};
