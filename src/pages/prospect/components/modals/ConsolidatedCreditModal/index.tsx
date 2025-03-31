import { Button } from "@inubekit/button";
import { Text, Stack, Grid, Divider, useMediaQuery } from "@inubekit/inubekit";

import { currencyFormat } from "@utils/formatData/currency";
import { InvestmentCreditCard } from "@pages/addProspect/components/InvestmentCreditCard";
import { BaseModal } from "@components/modals/baseModal";
import { mockConsolidatedCreditModal } from "@mocks/add-prospect/consolidated-credit-modal/consolidatedcreditmodal.mock";

import { ScrollableContainer } from "./styles";
import { ModalConfig } from "./config";

export interface ConsolidatedCreditsProps {
  handleClose: () => void;
  loading?: boolean;
}

export function ConsolidatedCredits(props: ConsolidatedCreditsProps) {
  const { loading, handleClose } = props;
  const isMobile = useMediaQuery("(max-width:880px)");
  const data = mockConsolidatedCreditModal[0];

  return (
    <BaseModal
      title={ModalConfig.title}
      nextButton={ModalConfig.keep}
      disabledNext={true}
      handleNext={handleClose}
      width={isMobile ? "300px" : "640px"}
      height={isMobile ? "auto" : "688px"}
      handleBack={handleClose}
      finalDivider={true}
      portalId="portal"
      backButton={ModalConfig.close}
    >
      <Stack direction="column" gap="24px">
        <Stack
          direction={isMobile ? "column" : "row"}
          alignItems="center"
          justifyContent={isMobile ? "center" : "space-between"}
          gap={isMobile ? "10px" : "0px"}
        >
          <Stack direction="column">
            <Text
              appearance="primary"
              weight="bold"
              type="headline"
              size="large"
            >
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
            fullwidth={isMobile}
          >
            {ModalConfig.edit}
          </Button>
        </Stack>
        <Divider dashed />
        <ScrollableContainer>
          <Stack
            direction="column"
            gap="16px"
            height={isMobile ? "auto" : "420px"}
            padding="0px 0px 0px 2px"
          >
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
                  code={item.code}
                  codeValue={item.codeValue}
                  expired={item.expired}
                  expiredValue={item.expiredValue}
                  title={ModalConfig.creditInvestment}
                />
              ))}
            </Grid>
          </Stack>
        </ScrollableContainer>
      </Stack>
    </BaseModal>
  );
}
