import { MdClear } from "react-icons/md";
import { useState } from "react";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";
import { useMediaQuery } from "@inubekit/hooks";
import { Grid } from "@inubekit/grid";

import { currencyFormat } from "@utils/formatData/currency";
import { InvestmentCreditCard } from "@pages/addProspect/components/InvestmentCreditCard";
import { CardConsolidatedCredit } from "@pages/addProspect/components/CardConsolidatedCredit";
import { mockConsolidatedCreditModal } from "@mocks/add-prospect/consolidated-credit-modal/consolidatedcreditmodal.mock";

import {
  StyledContainerClose,
  StyledModal,
  ScrollableContainer,
} from "./styles";
import { ModalConfig } from "./Config";

interface ConsolidatedCreditsInterfaceProps {
  handleClose: () => void;
  loading?: boolean;
  savedData?: {
    totalCollected: number;
    selectedValues: Record<string, number>;
  };
}

export function ConsolidatedCreditsInterface(
  props: ConsolidatedCreditsInterfaceProps
) {
  const { loading, handleClose, savedData } = props;
  const isMobile = useMediaQuery("(max-width:880px)");
  const data = mockConsolidatedCreditModal[0];
  const [editOpen, setEditOpen] = useState(true);

  console.log("Datos guardados en el modal:", savedData);
  return (
    <StyledModal $isMobile={isMobile}>
      <Stack justifyContent="space-between">
        <Text
          type={isMobile ? "title" : "headline"}
          size="small"
          appearance="dark"
        >
          {ModalConfig.title}
        </Text>
        <StyledContainerClose onClick={handleClose}>
          <Stack alignItems="center" gap="5px">
            <Text>{ModalConfig.closeButton}</Text>
            <Icon
              icon={<MdClear />}
              size={isMobile ? "18px" : "24px"}
              cursorHover
              appearance="dark"
            />
          </Stack>
        </StyledContainerClose>
      </Stack>
      <Divider />
      <Stack
        direction={isMobile ? "column" : "row"}
        alignItems="center"
        justifyContent={isMobile ? "center" : "space-between"}
        gap={isMobile ? "10px" : "0px"}
      >
        <Stack direction="column">
          <Text appearance="primary" weight="bold" type="headline" size="large">
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
      <Text type="body" appearance="gray" size="small" weight="bold">
        {ModalConfig.selectedText}
      </Text>
      <ScrollableContainer>
        <Grid
          autoRows="auto"
          templateColumns={isMobile ? "1fr" : "repeat(2, 1fr)"}
          gap="16px"
          width="0%"
        >
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
      </ScrollableContainer>
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
