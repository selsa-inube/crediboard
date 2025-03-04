import { MdOutlineVisibility, MdInfoOutline, MdCached } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";
import { SkeletonLine } from "@inubekit/skeleton";

import { BaseModal } from "@components/modals/baseModal";
import { currencyFormat } from "@utils/formatData/currency";
import { mockCreditLimit } from "@mocks/add-prospect/modals-amount/modalsAmount.mock";

import { creditLimitTexts } from "./creditLimitConfig";
import { StyledList } from "./styles";

export interface ICreditLimitProps {
  title: string;
  loading?: boolean;
  handleClose: () => void;
  onOpenPaymentCapacityModal?: () => void;
  onOpenReciprocityModal?: () => void;
  onOpenFrcModal?: () => void;
}

export const CreditLimit = (props: ICreditLimitProps) => {
  const {
    title,
    loading,
    handleClose,
    onOpenPaymentCapacityModal,
    onOpenReciprocityModal,
    onOpenFrcModal,
  } = props;

  const isMobile = useMediaQuery("(max-width: 700px)");
  const data = mockCreditLimit[0];

  return (
    <BaseModal
      title={title}
      nextButton={creditLimitTexts.closeButton}
      handleNext={handleClose}
      width={isMobile ? "280px" : "550px"}
      height={isMobile ? "auto" : "497px"}
      iconBeforeNext={<MdCached />}
      handleBack={handleClose}
      finalDivider={true}
    >
      <Stack direction="column" gap="24px">
        <StyledList>
          <Stack direction="column" gap="12px">
            <li>
              <Stack justifyContent="space-between">
                <Text appearance="dark" size="large" weight="bold" type="label">
                  {creditLimitTexts.maxPaymentCapacity}
                </Text>

                <Stack alignItems="center">
                  <Text appearance="success">$</Text>
                  {loading ? (
                    <SkeletonLine width="70px" animated={true} />
                  ) : (
                    <Text type="body" size="medium" appearance="dark">
                      {currencyFormat(data.maxPaymentCapacity, false)}
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
                <Text appearance="dark" size="large" weight="bold" type="label">
                  {creditLimitTexts.maxReciprocity}
                </Text>
                <Stack alignItems="center">
                  <Text appearance="success">$</Text>
                  {loading ? (
                    <SkeletonLine width="70px" animated={true} />
                  ) : (
                    <Text type="body" size="medium" appearance="dark">
                      {currencyFormat(data.maxReciprocity, false)}
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
                <Text appearance="dark" size="large" weight="bold" type="label">
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
                      {currencyFormat(data.maxDebtFRC, false)}
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
                <Text appearance="dark" size="large" weight="bold" type="label">
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
                      {currencyFormat(data.assignedLimit, false)}
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
                  {currencyFormat(data.maxUsableLimit, false)}
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
                  {currencyFormat(data.currentPortfolio, false)}
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
                {currencyFormat(data.availableLimitWithoutGuarantee, false)}
              </Text>
            )}
          </Stack>
        </Stack>
      </Stack>
    </BaseModal>
  );
};
