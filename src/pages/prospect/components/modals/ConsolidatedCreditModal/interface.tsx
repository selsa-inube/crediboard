import { MdClear } from "react-icons/md";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Grid } from "@inubekit/grid";

import { currencyFormat } from "@utils/formatData/currency";
import { InvestmentCreditCard } from "@pages/addProspect/components/InvestmentCreditCard";
import { mockConsolidatedCreditModal } from "@mocks/add-prospect/consolidated-credit-modal/consolidatedcreditmodal.mock";

import { StyledContainerClose, StyledModal } from "./styles";
import { ModalConfig } from "./Config";

interface ConsolidatedCreditsInterfaceProps {
  handleClose: () => void;
  loading?: boolean;
}

export function ConsolidatedCreditsInterface(
  props: ConsolidatedCreditsInterfaceProps
) {
  const { loading, handleClose } = props;
  const isMobile = useMediaQuery("(max-width:880px)");
  const data = mockConsolidatedCreditModal[0];

  return (
    <StyledModal $isMobile={isMobile}>
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
      <Grid
        autoRows="auto"
        templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
        gap="16px"
        width="0%"
      >
        {data.investments.map((item, index) => (
          <InvestmentCreditCard
            key={index}
            code={ModalConfig.investmentCode}
            codeValue={item.investmentCode}
            expired={
              index === 0 ? ModalConfig.expired : ModalConfig.nextExpiration
            }
            expiredValue={item.expiredValue}
            title={ModalConfig.creditInvestment}
          />
        ))}
      </Grid>
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
}
