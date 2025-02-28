import { useState } from "react";
import { Stack } from "@inubekit/stack";
import { Tabs } from "@inubekit/tabs";

import { BaseModal } from "@components/modals/baseModal";
import { SourceIncome } from "@pages/prospect/components/SourceIncome";
import { TableFinancialObligations } from "@pages/prospect/components/TableObligationsFinancial";
import { income } from "@mocks/add-prospect/income/income.mock";

import { dataEditDebtor, dataTabs } from "./config";
import { DataDebtor } from "./dataDebtor";

interface IDebtorEditModalProps {
  handleClose: () => void;
  isMobile: boolean;
}

export function DebtorEditModal(props: IDebtorEditModalProps) {
  const { handleClose, isMobile } = props;

  const [currentTab, setCurrentTab] = useState(dataTabs[0].id);

  const onChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  const handleOnChange = (name: string, newValue: string) => {
    console.log(name, newValue);
  };

  const dataIncome = income[0];

  return (
    <BaseModal
      title={dataEditDebtor.title}
      nextButton={dataEditDebtor.save}
      backButton={dataEditDebtor.close}
      handleNext={handleClose}
      handleBack={handleClose}
      finalDivider={true}
      width={isMobile ? "290px" : "912px"}
      height={isMobile ? "auto" : "680px"}
    >
      <Stack direction="column" height={isMobile ? "auto" : "510px"} gap="24px">
        <Tabs
          scroll={isMobile}
          selectedTab={currentTab}
          tabs={dataTabs}
          onChange={onChange}
        />
        {currentTab === "data" && <DataDebtor />}
        {currentTab === "sources" && (
          <SourceIncome
            form={dataIncome}
            options={dataIncome.borrowers}
            onChange={handleOnChange}
            onlyDebtor={true}
          />
        )}
        {currentTab === "obligations" && (
          <TableFinancialObligations showActions={true} showOnlyEdit={true} />
        )}
      </Stack>
    </BaseModal>
  );
}
