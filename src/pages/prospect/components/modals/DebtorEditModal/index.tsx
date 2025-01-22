import { useState } from "react";
import { createPortal } from "react-dom";
import { Blanket } from "@inubekit/blanket";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";
import { Icon } from "@inubekit/icon";
import { MdClear } from "react-icons/md";
import { Divider } from "@inubekit/divider";
import { Tabs } from "@inubekit/tabs";
import { Button } from "@inubekit/button";

import { TableFinancialObligations } from "@pages/prospect/components/TableObligationsFinancial";
import { SourcesOfIncome } from "@pages/addProspect/steps/sourcesOfIncome";
import { income } from "@mocks/add-prospect/income/income.mock";
import { validationMessages } from "@validations/validationMessages";

import { StyledContainer, StyledContainerClose } from "./styles";
import { dataEditDebtor, dataTabs } from "./config";
import { DataDebtor } from "./dataDebtor";

interface IDebtorEditModalProps {
  handleClose: () => void;
  isMobile: boolean;
  portalId?: string;
}

export function DebtorEditModal(props: IDebtorEditModalProps) {
  const { handleClose, isMobile, portalId = "portal" } = props;

  const node = document.getElementById(portalId ?? "portal");
  if (!node) {
    throw new Error(validationMessages.errorNodo);
  }

  const [currentTab, setCurrentTab] = useState(dataTabs[0].id);

  const onChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  const handleOnChange = (name: string, newValue: string) => {
    console.log(name, newValue);
  };

  const dataIncome = income[0];

  return createPortal(
    <Blanket>
      <StyledContainer>
        <Stack
          direction="column"
          padding="24px"
          gap="24px"
          width={isMobile ? "290px" : "704px"}
          height={isMobile ? "auto" : "640px"}
        >
          <Stack justifyContent="space-between" alignItems="center">
            <Text type="headline" size="small">
              {dataEditDebtor.title}
            </Text>
            <StyledContainerClose onClick={handleClose}>
              <Stack alignItems="center" gap="8px">
                <Text type="body" size="large">
                  {dataEditDebtor.close}
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
            {currentTab === "sources" && (
              <SourcesOfIncome
                initialValues={dataIncome}
                options={dataIncome.borrowers}
                handleOnChange={handleOnChange}
                isMobile={isMobile}
              />
            )}
            {currentTab === "obligations" && <TableFinancialObligations />}
          </Stack>
          <Divider />
          <Stack justifyContent="end" alignItems="end" gap="16px">
            <Button variant="outlined" onClick={handleClose} appearance="gray">
              {dataEditDebtor.close}
            </Button>
            <Button onClick={handleClose}>{dataEditDebtor.save}</Button>
          </Stack>
        </Stack>
      </StyledContainer>
    </Blanket>,
    node
  );
}
