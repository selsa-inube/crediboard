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

export function DeductibleExpensesModal(props: DeductibleExpensesModalProps) {
  const { handleClose, portalId, loading = false } = props;

  const calculateTotalExpenses = () => {
    return mockDeductibleExpenses.reduce((acc, item) => acc + item.value, 0);
  };

  const isMobile = useMediaQuery("(max-width:880px)");
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
            <Stack direction="column" padding="8px" gap="10px">
              {mockDeductibleExpenses.map((item, index) => (
                <Stack key={index} justifyContent="space-between">
                  {loading ? (
                    <SkeletonLine width="50%" animated={true} />
                  ) : (
                    <Text type="label" weight="bold" size="large">
                      {item.type}
                    </Text>
                  )}
                  {loading ? (
                    <SkeletonLine width="30%" animated={true} />
                  ) : (
                    <Stack alignItems="center">
                      <Text
                        type="body"
                        weight="bold"
                        size="small"
                        appearance="success"
                      >
                        $
                      </Text>
                      <Text type="body" size="medium">
                        {currencyFormat(item.value, false)}
                      </Text>
                    </Stack>
                  )}
                </Stack>
              ))}
            </Stack>
          </ScrollableContainer>
          <Stack direction="column" justifyContent="space-between" gap="12px">
            <Stack justifyContent="space-between">
              <Text type="label" weight="bold" size="large">
                {deductibleexpenses.totalExpenses}
              </Text>
              <Stack>
                <Text
                  type="body"
                  weight="bold"
                  size="small"
                  appearance="success"
                >
                  $
                </Text>
                {loading ? (
                  <SkeletonLine width="70px" animated={true} />
                ) : (
                  <Text type="body" weight="bold" size="medium">
                    {currencyFormat(calculateTotalExpenses(), false)}
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
