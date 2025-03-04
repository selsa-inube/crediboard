import { useState } from "react";
import { Stack } from "@inubekit/stack";
import { Tabs } from "@inubekit/tabs";

import { BaseModal } from "@components/modals/baseModal";
import { Fieldset } from "@components/data/Fieldset";

import { dataDisbursement, dataTabs } from "./config";
import { DisbursementInternal } from "./Internal";
import { DisbursementExternal } from "./External";
import { DisbursementCheckEntity } from "./CheckEntity";
import { DisbursementChequeManagement } from "./ChequeManagement";
import { DisbursementCash } from "./Cash";

export interface IDisbursementModalProps {
  handleClose: () => void;
  isMobile: boolean;
}

export function DisbursementModal(
  props: IDisbursementModalProps
): JSX.Element | null {
  const { handleClose, isMobile } = props;

  const [currentTab, setCurrentTab] = useState(dataTabs[0].id);
  const onChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  return (
    <BaseModal
      title={dataDisbursement.title}
      finalDivider={true}
      handleClose={handleClose}
      handleNext={handleClose}
      nextButton={dataDisbursement.close}
      width={isMobile ? "300px" : "652px"}
      height={isMobile ? "566px" : "662px"}
    >
      <Stack>
        <Tabs
          scroll={isMobile}
          selectedTab={currentTab}
          tabs={dataTabs}
          onChange={onChange}
        />
      </Stack>
      <Fieldset heightFieldset="469px">
        <>
          {currentTab === "Internal" && (
            <DisbursementInternal isMobile={isMobile} />
          )}
          {currentTab === "External" && (
            <DisbursementExternal isMobile={isMobile} />
          )}
          {currentTab === "CheckEntity" && (
            <DisbursementCheckEntity isMobile={isMobile} />
          )}
          {currentTab === "ChequeManagement" && (
            <DisbursementChequeManagement isMobile={isMobile} />
          )}
          {currentTab === "Cash" && <DisbursementCash isMobile={isMobile} />}
        </>
      </Fieldset>
    </BaseModal>
  );
}
