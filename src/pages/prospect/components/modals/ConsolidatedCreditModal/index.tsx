import { Button } from "@inubekit/button";
import { useState } from "react";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Grid } from "@inubekit/grid";

import { currencyFormat } from "@utils/formatData/currency";
import { InvestmentCreditCard } from "@pages/addProspect/components/InvestmentCreditCard";
import { BaseModal } from "@components/modals/baseModal";
import { CardConsolidatedCredit } from "@pages/addProspect/components/CardConsolidatedCredit";
import { mockConsolidatedCreditModal } from "@mocks/add-prospect/consolidated-credit-modal/consolidatedcreditmodal.mock";

import { ScrollableContainer } from "./styles";
import { ModalConfig } from "./config";

export interface ConsolidatedCreditsProps {
  handleClose: () => void;
  loading?: boolean;
  savedData?: {
    totalCollected: number;
    selectedValues: Record<string, number>;
  };
}

export function ConsolidatedCredits(props: ConsolidatedCreditsProps) {
  const { loading, handleClose, savedData } = props;
  const isMobile = useMediaQuery("(max-width:880px)");
  const data = mockConsolidatedCreditModal[0];
  const [editOpen, setEditOpen] = useState(true);

  return (
    <BaseModal
      title={ModalConfig.title}
      nextButton={ModalConfig.keep}
      disabledNext={true}
      handleNext={handleClose}
      width={isMobile ? "300px" : "644px"}
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
                : currencyFormat(
                  savedData?.totalCollected || data.collectedValue,
                  false
                )}
            </Text>
            <Text type="body" appearance="gray" size="small" textAlign="center">
              {ModalConfig.collectedValue}
            </Text>
          </Stack>
          <Button
            onClick={() => setEditOpen(false)}
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
            gap="24px"
            height={isMobile ? "auto" : "420px"}
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
               {editOpen
            ? data.investments.map((item, index) => (
                <InvestmentCreditCard
                  key={index}
                  code={item.code}
                  codeValue={item.codeValue}
                  expired={item.expired}
                  expiredValue={item.expiredValue}
                  title={ModalConfig.creditInvestment}
                />
              ))
            : Object.entries(savedData?.selectedValues || {}).map(
                ([creditId, value]) => (
                  <CardConsolidatedCredit
                    key={creditId}
                    title={`Crédito ${creditId}`}
                    code={creditId}
                    expiredValue={value}
                    nextDueDate={new Date("2023-12-31").getTime()}
                    fullPayment={value}
                    date={new Date()}
                    onUpdateTotal={() => {}}
                    arrears={false}
                    initialValue={value}
                    isMobile={isMobile}
                  />
                )
              )}
            </Grid>
          </Stack>
        </ScrollableContainer>
      </Stack>
    </BaseModal>
  );
}
