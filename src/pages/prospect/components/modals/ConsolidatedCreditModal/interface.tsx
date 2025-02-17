import { forwardRef } from "react";
import { MdClear } from "react-icons/md";

import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";

import { currencyFormat } from "@utils/formatData/currency";
import { InvestmentCreditCard } from "@pages/addProspect/components/InvestmentCreditCard";
import { mockConsolidatedCreditModal } from "@mocks/add-prospect/consolidated-credit-modal/consolidatedcreditmodal.mock";

import { StyledContainerClose, StyledModal } from "./styles";
import { ModalConfig } from "./Config";

interface ConsolidatedCreditsInterfaceProps {
  handleClose: () => void;
  loading?: boolean;
}

export const ConsolidatedCreditsInterface = forwardRef<
  HTMLDivElement,
  ConsolidatedCreditsInterfaceProps
>(function ConsolidatedCreditsInterface(props, ref) {
  const { loading, handleClose } = props;
  const isMobile = useMediaQuery("(max-width:880px)");
  const data = mockConsolidatedCreditModal[0];

  return (
    <StyledModal ref={ref} $isMobile={isMobile}>
      <Stack justifyContent="space-between">
        <Text type="headline" size="small" appearance="dark">
          {ModalConfig.title}
        </Text>
        <StyledContainerClose onClick={handleClose}>
          <Stack alignItems="center" gap="5px">
            <Text>{ModalConfig.closeButton}</Text>
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

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="column">
          <Text appearance="primary" weight="bold" type="headline" size="large">
            $
            {loading
              ? ModalConfig.loading
              : currencyFormat(data.collectedValue, false)}
          </Text>
          <Text type="body" appearance="gray" size="small" textAlign="center">
            {ModalConfig.collectedValue}
          </Text>
        </Stack>
        <Button
          onClick={() => {}}
          variant="outlined"
          appearance="primary"
          spacing="wide"
        >
          {ModalConfig.edit}
        </Button>
      </Stack>

      <Divider dashed />
      <Text type="body" appearance="gray" size="small" weight="bold">
        {ModalConfig.selectedText}
      </Text>
      <Stack direction={isMobile ? "column" : "row"} gap="16px">
        <InvestmentCreditCard
          code={ModalConfig.investmentCode}
          codeValue={data.investmentCode}
          expired={ModalConfig.expired}
          expiredValue={data.expiredValue}
          title={ModalConfig.creditInvestment}
        />
        <InvestmentCreditCard
          code={ModalConfig.investmentCode}
          codeValue={data.investmentCode}
          expired={ModalConfig.nextExpiration}
          expiredValue={data.nextExpiration}
          title={ModalConfig.creditInvestment}
        />
      </Stack>
      <Stack height="100%" direction="column" justifyContent="end" gap="16px">
        <Divider />
        <Stack gap="20px" justifyContent="end">
          <Button onClick={handleClose} variant="outlined" appearance="gray">
            {ModalConfig.close}
          </Button>
          <Button
            onClick={() => {}}
            variant="filled"
            disabled
            spacing="wide"
            appearance="primary"
          >
            {ModalConfig.keep}
          </Button>
        </Stack>
      </Stack>
    </StyledModal>
  );
});
