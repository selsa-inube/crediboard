import { useEffect, useState } from "react";
import { Stack } from "@inubekit/inubekit";
import { Tabs } from "@inubekit/tabs";

import { BaseModal } from "@components/modals/baseModal";
import { SourceIncome } from "@pages/prospect/components/SourceIncome";
import { TableFinancialObligations } from "@pages/prospect/components/TableObligationsFinancial";
import { IIncomeSources } from "@services/incomeSources/types";
import { getSearchProspectById } from "@services/prospects";

import { dataEditDebtor, dataTabs } from "./config";
import { DataDebtor } from "./dataDebtor";

interface IDebtorEditModalProps {
  handleClose: () => void;
  isMobile: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues: any;
}

export function DebtorEditModal(props: IDebtorEditModalProps) {
  const { handleClose, isMobile, initialValues } = props;

  const [currentTab, setCurrentTab] = useState(dataTabs[0].id);

  const onChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  const [incomeData, setIncomeData] = useState<IIncomeSources | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prospectData = await getSearchProspectById(
          "test", // acuerdese de cambiar las props
          "67ec4f9115ddc25b00d3df14"
        );

        console.log("Prospect Data:", prospectData);

        const borrower = prospectData.borrowers.find(
          (b) => b.borrower_type === "main_borrower"
        );

        if (borrower) {
          const getData = (name: string) =>
            borrower.borrower_properties.find((p) => p.property_name === name)
              ?.property_value;

          const incomeSource: IIncomeSources = {
            identificationNumber: borrower.borrower_identification_number,
            identificationType: borrower.borrower_identification_type,
            name: getData("name") || "",
            surname: getData("surname") || "",
            leases: parseFloat(getData("leases") || "0"),
            dividends: parseFloat(getData("dividends") || "0"),
            financialIncome: parseFloat(getData("financialIncome") || "0"),
            periodicSalary: parseFloat(getData("PeriodicSalary") || "0"),
            otherNonSalaryEmoluments: parseFloat(
              getData("otherNonSalaryEmoluments") || "0"
            ),
            pensionAllowances: parseFloat(getData("pensionAllowances") || "0"),
            personalBusinessUtilities: parseFloat(
              getData("PersonalBusinessUtilities") || "0"
            ),
            professionalFees: parseFloat(getData("professionalFees") || "0"),
          };

          setIncomeData(incomeSource);
        }
      } catch (error) {
        console.error("Error fetching prospect data:", error);
      }
    };

    fetchData();
  }, []);

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
        {currentTab === "data" && <DataDebtor data={initialValues} />}
        {currentTab === "sources" && (
          <SourceIncome data={incomeData} showEdit={false} />
        )}
        {currentTab === "obligations" && (
          <TableFinancialObligations
            initialValues={initialValues}
            showActions={true}
          />
        )}
      </Stack>
    </BaseModal>
  );
}
