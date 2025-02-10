import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { SkeletonLine } from "@inubekit/skeleton";
import { useMediaQuery } from "@inubekit/hooks";
import { Blanket } from "@inubekit/blanket";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";
import { Button } from "@inubekit/button";

import { currencyFormat } from "@utils/formatData/currency";
import { mockDeductibleExpenses } from "@mocks/add-prospect/deductible-expenses-modal/deductibleexpenses.mock";

import {
  StyledContainerClose,
  StyledContainer,
  ScrollableContainer,
} from "./styles";
import { deductibleexpenses } from "./config";

export interface DeductibleExpensesModalProps {
  handleClose: () => void;
  portalId?: string;
  loading?: boolean;
}

export function DeductibleExpensesModal({
  portalId,
  handleClose,
  loading,
}: DeductibleExpensesModalProps) {
  const isMobile = useMediaQuery("(max-width:880px)");
  const data = mockDeductibleExpenses[0];

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(
      "The portal node is not defined. This can occur when the specific node used to render the portal has not been defined correctly."
    );
  }

  return createPortal(
    <Blanket>
      <StyledContainer>
        <Stack
          direction="column"
          padding="24px"
          gap="24px"
          width={!isMobile ? "450px" : "287px"}
        >
          <Stack justifyContent="space-between" alignItems="center" gap="15px">
            <Text size="small" type="headline">
              {deductibleexpenses.deductibleExpenses}
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap="8px">
                <Text>{deductibleexpenses.close}</Text>
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
          <ScrollableContainer>
            <Stack justifyContent="space-between">
              <Text size="medium" appearance="gray" weight="bold">
                {deductibleexpenses.adjustmentInterest}
              </Text>
              <Stack>
                <Text type="body" size="medium" appearance="success">
                  $
                </Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text
                    type="body"
                    size="medium"
                    appearance="gray"
                    weight="bold"
                  >
                    {currencyFormat(data.adjustmentInterest, false)}
                  </Text>
                )}
              </Stack>
            </Stack>
            <Stack justifyContent="space-between">
              <Text size="medium" appearance="gray" weight="bold">
                {deductibleexpenses.bail}
              </Text>
              <Stack>
                <Text type="body" size="medium" appearance="success">
                  $
                </Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text
                    type="body"
                    size="medium"
                    appearance="gray"
                    weight="bold"
                  >
                    {currencyFormat(data.bail, false)}
                  </Text>
                )}
              </Stack>
            </Stack>

            <Stack justifyContent="space-between">
              <Text size="medium" appearance="gray" weight="bold">
                {deductibleexpenses.sureOne}
              </Text>
              <Stack>
                <Text type="body" size="medium" appearance="success">
                  $
                </Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text
                    type="body"
                    size="medium"
                    appearance="gray"
                    weight="bold"
                  >
                    {currencyFormat(data.sureOne, false)}
                  </Text>
                )}
              </Stack>
            </Stack>

            <Stack justifyContent="space-between">
              <Text size="medium" appearance="gray" weight="bold">
                {deductibleexpenses.sureTwo}
              </Text>
              <Stack>
                <Text type="body" size="medium" appearance="success">
                  $
                </Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text
                    type="body"
                    size="medium"
                    appearance="gray"
                    weight="bold"
                  >
                    {currencyFormat(data.sureTwo, false)}
                  </Text>
                )}
              </Stack>
            </Stack>

            <Stack justifyContent="space-between">
              <Text size="medium" appearance="gray" weight="bold">
                {deductibleexpenses.sureThere}
              </Text>
              <Stack>
                <Text type="body" size="medium" appearance="success">
                  $
                </Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text
                    type="body"
                    size="medium"
                    appearance="gray"
                    weight="bold"
                  >
                    {currencyFormat(data.sureThere, false)}
                  </Text>
                )}
              </Stack>
            </Stack>

            <Stack justifyContent="space-between">
              <Text size="medium" appearance="gray" weight="bold">
                {deductibleexpenses.sureFour}
              </Text>
              <Stack>
                <Text type="body" size="medium" appearance="success">
                  $
                </Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text
                    type="body"
                    size="medium"
                    appearance="gray"
                    weight="bold"
                  >
                    {currencyFormat(data.sureFour, false)}
                  </Text>
                )}
              </Stack>
            </Stack>
            <Stack justifyContent="space-between">
              <Text size="medium" appearance="gray" weight="bold">
                {deductibleexpenses.sureFive}
              </Text>
              <Stack>
                <Text type="body" size="medium" appearance="success">
                  $
                </Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text
                    type="body"
                    size="medium"
                    appearance="gray"
                    weight="bold"
                  >
                    {currencyFormat(data.sureFive, false)}
                  </Text>
                )}
              </Stack>
            </Stack>
            <Stack justifyContent="space-between">
              <Text size="medium" appearance="gray" weight="bold">
                {deductibleexpenses.sureSix}
              </Text>
              <Stack>
                <Text type="body" size="medium" appearance="success">
                  $
                </Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text
                    type="body"
                    size="medium"
                    appearance="gray"
                    weight="bold"
                  >
                    {currencyFormat(data.sureSix, false)}
                  </Text>
                )}
              </Stack>
            </Stack>
            <Stack justifyContent="space-between">
              <Text size="medium" appearance="gray" weight="bold">
                {deductibleexpenses.sureSeven}
              </Text>
              <Stack>
                <Text type="body" size="medium" appearance="success">
                  $
                </Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text
                    type="body"
                    size="medium"
                    appearance="gray"
                    weight="bold"
                  >
                    {currencyFormat(data.sureSeven, false)}
                  </Text>
                )}
              </Stack>
            </Stack>
          </ScrollableContainer>
          <Stack direction="column" justifyContent="space-between" gap="12px">
            <Stack justifyContent="space-between">
              <Text size="medium" appearance="dark" weight="bold">
                {deductibleexpenses.totalExpenses}
              </Text>
              <Stack>
                <Text type="body" size="medium" appearance="success">
                  $
                </Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text
                    type="body"
                    size="medium"
                    appearance="dark"
                    weight="bold"
                  >
                    {currencyFormat(data.totalExpenses, false)}
                  </Text>
                )}
              </Stack>
            </Stack>
          </Stack>
          <Divider />
          <Stack justifyContent="end">
            <Button
              children={deductibleexpenses.close}
              appearance="primary"
              onClick={handleClose}
              fullwidth={isMobile}
            />
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}
