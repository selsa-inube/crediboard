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
import {
  mockDeductibleExpenses,
  mocksures,
} from "@mocks/add-prospect/deductible-expenses-modal/deductibleexpenses.mock";
import { validationMessages } from "@validations/validationMessages";

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

const calculateTotalExpenses = (
  adjustmentInterest: number,
  bail: number,
  sures: { sure: number }[]
): number => {
  const totalSures = sures.reduce((acc, { sure }) => acc + sure, 0);
  return adjustmentInterest + bail + totalSures;
};

export function DeductibleExpensesModal({
  portalId,
  handleClose,
  loading,
}: DeductibleExpensesModalProps) {
  const isMobile = useMediaQuery("(max-width:880px)");
  const data = mockDeductibleExpenses[0];

  const totalExpenses = calculateTotalExpenses(
    data.adjustmentInterest.value,
    data.bail.value,
    mocksures
  );

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }

  return createPortal(
    <Blanket>
      <StyledContainer>
        <Stack
          direction="column"
          padding="24px"
          gap="24px"
          width={!isMobile ? "540px" : "400px"}
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
                {data.adjustmentInterest.label}
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
                    {currencyFormat(data.adjustmentInterest.value, false)}
                  </Text>
                )}
              </Stack>
            </Stack>
            <Stack justifyContent="space-between">
              <Text size="medium" appearance="gray" weight="bold">
                {data.bail.label}
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
                    {currencyFormat(data.bail.value, false)}
                  </Text>
                )}
              </Stack>
            </Stack>
            {mocksures.map((sure, index) => (
              <Stack key={index} justifyContent="space-between">
                <Text size="medium" appearance="gray" weight="bold">
                  {data.sure.label + ` ${index + 1}`}
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
                      {currencyFormat(sure.sure, false)}
                    </Text>
                  )}
                </Stack>
              </Stack>
            ))}
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
                    {currencyFormat(totalExpenses, false)}
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
