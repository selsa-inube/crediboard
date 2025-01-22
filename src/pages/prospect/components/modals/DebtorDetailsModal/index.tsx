import { useState } from "react";
import { MdClear } from "react-icons/md";
import { createPortal } from "react-dom";
import { Blanket } from "@inubekit/blanket";
import { Button } from "@inubekit/button";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { Divider } from "@inubekit/divider";
import { Tabs } from "@inubekit/tabs";

import { TableFinancialObligations } from "@pages/prospect/components/TableObligationsFinancial";
import { validationMessages } from "@validations/validationMessages";

import { StyledContainer, StyledContainerClose } from "./styles";
import { dataDetails, dataTabs } from "./config";
import { DataDebtor } from "./dataDebtor";
import { IncomeDebtor } from "./incomeDebtor";

interface IDebtorDetailsModalProps {
  handleClose: () => void;
  isMobile?: boolean;
  portalId?: string;
}

export function DebtorDetailsModal(props: IDebtorDetailsModalProps) {
  const { handleClose, isMobile, portalId = "portal" } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }

  const [currentTab, setCurrentTab] = useState(dataTabs[0].id);

  const onChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  return createPortal(
    <Blanket>
      <StyledContainer>
        <Stack
          direction="column"
          padding="24px"
          gap="24px"
          width="704px"
          height="640px"
        >
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="headline" size="small">
              {dataDetails.title}
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap="8px">
                <Text type="body" size="large">
                  {dataDetails.close}
                </Text>
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
          <Stack direction="column" height="100%" gap="24px">
            <Tabs
              scroll={isMobile}
              selectedTab={currentTab}
              tabs={dataTabs}
              onChange={onChange}
            />
            {currentTab === "data" && <DataDebtor />}
            {currentTab === "sources" && <IncomeDebtor />}
            {currentTab === "obligations" && <TableFinancialObligations />}
          </Stack>
          <Divider />
          <Stack justifyContent="end" alignItems="end">
            <Button onClick={handleClose}>{dataDetails.close}</Button>
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}
