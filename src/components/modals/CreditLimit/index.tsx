import { createPortal } from "react-dom";
import { MdClear, MdOutlineVisibility, MdInfoOutline } from "react-icons/md";
import { useMediaQuery } from "@inubekit/hooks";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Blanket } from "@inubekit/blanket";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";

import { currencyFormat } from "@utils/formatData/currency";

import { creditLimitTexts } from "./creditLimitConfig";
import {
  StyledContainerClose,
  StyledModal,
  StyledDivider,
  StyledList,
} from "./styles";

export interface ICreditLimitProps {
  title: string;
  handleClose: () => void;
  portalId?: string;
  maxPaymentCapacity: number;
  maxReciprocity: number;
  maxDebtFRC: number;
  assignedLimit: number;
  currentPortfolio: number;
  maxUsableLimit: number;
  availableLimitWithoutGuarantee: number;
}

export const CreditLimit = (props: ICreditLimitProps) => {
  const {
    title,
    portalId,
    handleClose,
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
        <StyledDivider />
        <Stack direction="column">
          <StyledList>
            <li>
              <Stack padding="10px 0px" justifyContent="space-between">
                <Text appearance="dark" size="large" weight="bold">
                  {creditLimitTexts.maxPaymentCapacity}
                </Text>

                <Stack alignItems="center">
                  <Text appearance="success">$</Text>
                  <Text>{currencyFormat(maxPaymentCapacity, false)}</Text>
                  <Stack margin="0px 0px 0px 5px">
                    <Icon
                      appearance="primary"
                      icon={<MdOutlineVisibility />}
                      size="16px"
                      spacing="none"
                      cursorHover={true}
                      variant="filled"
                      shape="circle"
                    />
                  </Stack>
                </Stack>
              </Stack>
            </li>
            <li>
              <Stack padding="10px 0px" justifyContent="space-between">
                <Text appearance="dark" size="large" weight="bold">
                  {creditLimitTexts.maxReciprocity}
                </Text>

                <Stack alignItems="center">
                  <Text appearance="success">$</Text>
                  <Text>{currencyFormat(maxReciprocity, false)}</Text>
                  <Stack margin="0px 0px 0px 5px">
                    <Icon
                      appearance="primary"
                      icon={<MdOutlineVisibility />}
                      size="16px"
                      spacing="none"
                      cursorHover={true}
                      variant="filled"
                      shape="circle"
                    />
                  </Stack>
                </Stack>
              </Stack>
            </li>
            <li>
              <Stack padding="10px 0px" justifyContent="space-between">
                <Text appearance="dark" size="large" weight="bold">
                  {creditLimitTexts.maxDebtFRC}
                </Text>

                <Stack alignItems="center">
                  <Text appearance="success">$</Text>
                  <Text weight="bold">{currencyFormat(maxDebtFRC, false)}</Text>
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
            </li>
            <li>
              <Stack padding="10px 0px" justifyContent="space-between">
                <Text appearance="dark" size="large" weight="bold">
                  {creditLimitTexts.assignedLimit}
                </Text>
                <Stack>
                  <Text appearance="success">$</Text>
                  <Text weight="bold">
                    {currencyFormat(assignedLimit, false)}
                  </Text>
                </Stack>
              </Stack>
            </li>
          </StyledList>

          <StyledDivider />

          <Stack alignItems="center" margin="10px 0px">
            <Icon
              appearance="primary"
              icon={<MdInfoOutline />}
              size="16px"
              spacing="none"
            />
            <Text margin="5px" size="small">
              {creditLimitTexts.maxUsableLimitNote}
            </Text>
          </Stack>

          <Stack padding="10px 0px" justifyContent="space-between">
            <Text weight="bold">{creditLimitTexts.maxUsableLimit}</Text>
            <Stack>
              <Text appearance="success">$</Text>
              <Text>{currencyFormat(maxUsableLimit, false)}</Text>
            </Stack>
          </Stack>
          <Stack padding="10px 0px" justifyContent="space-between">
            <Text size="large" appearance="gray" weight="bold">
              {creditLimitTexts.currentPortfolio}
            </Text>
            <Stack>
              <Text appearance="success">$</Text>
              <Text>{currencyFormat(currentPortfolio, false)}</Text>
            </Stack>
          </Stack>
          <Stack padding="10px 0px" justifyContent="space-between">
            <Text weight="bold">
              {creditLimitTexts.availableLimitWithoutGuarantee}
            </Text>
            <Stack>
              <Text appearance="success">$</Text>
              <Text weight="bold">
                {currencyFormat(availableLimitWithoutGuarantee, false)}
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <StyledDivider />
        <Stack justifyContent="end">
          <Button
            onClick={handleClose}
            variant="filled"
            appearance="primary"
            fullwidth={isMobile}
          >
            {creditLimitTexts.closeButton}
          </Button>
        </Stack>
      </StyledModal>
    </Blanket>,
    node
  );
};
