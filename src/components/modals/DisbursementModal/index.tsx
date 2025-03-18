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
import { dataTabsDisbursement } from "./types";

export interface IDisbursementModalProps {
  handleClose: () => void;
  isMobile: boolean;
  loading?: boolean;
  data: {
    internal: dataTabsDisbursement;
    external: dataTabsDisbursement;
    CheckEntity: dataTabsDisbursement;
    checkManagementData: dataTabsDisbursement;
    cash: dataTabsDisbursement;
  };
}

export function DisbursementModal(
  props: IDisbursementModalProps
): JSX.Element | null {
  const {
    handleClose,
    isMobile,
    data,
  } = props;

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
            <DisbursementInternal isMobile={isMobile} data={data.internal} />
          )}
          {currentTab === "External" && (
            <DisbursementExternal isMobile={isMobile} data={data.external} />
          )}
          {currentTab === "CheckEntity" && (
            <DisbursementCheckEntity
              isMobile={isMobile}
              data={data.CheckEntity}
            />
          )}
          {currentTab === "CheckManagement" && (
            <DisbursementChequeManagement
              isMobile={isMobile}
              data={data.checkManagementData}
            />
          )}
          {currentTab === "Cash" && (
            <DisbursementCash isMobile={isMobile} data={data.cash} />
          )}
        </>
      </Fieldset>
    </BaseModal>
  );
}
