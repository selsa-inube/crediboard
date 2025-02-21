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
  data: (typeof mockDeductibleExpenses)[0]
): number => {
  const { adjustmentInterest, bail, ...sures } = data;
  const totalSures = Object.values(sures).reduce((acc, sure) => acc + sure, 0);
  return adjustmentInterest + bail + totalSures;
};

export function DeductibleExpensesModal({
  portalId,
  handleClose,
  loading,
}: DeductibleExpensesModalProps) {
  const isMobile = useMediaQuery("(max-width:880px)");
  const data = mockDeductibleExpenses[0];
  const totalExpenses = calculateTotalExpenses(data);
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
            {Object.entries(data)
              .filter(([key]) => key.startsWith("sure"))
              .map(([key, sure], index) => (
                <Stack key={key} justifyContent="space-between">
                  <Text size="medium" appearance="gray" weight="bold">
                    {deductibleexpenses.sure + " " + (index + 1)}
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
                        {currencyFormat(sure, false)}{" "}
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
