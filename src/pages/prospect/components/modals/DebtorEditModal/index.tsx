import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Stack, useFlag } from "@inubekit/inubekit";
import { Tabs } from "@inubekit/tabs";

import { AppContext } from "@context/AppContext";
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
  const [incomeData, setIncomeData] = useState<IIncomeSources | undefined>(
    undefined
  );
  const [isModified, setIsModified] = useState(false);

  const { prospectCode } = useParams();
  const { businessUnitSigla } = useContext(AppContext);

  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;

  const { addFlag } = useFlag();

  const handleFlag = (error: unknown) => {
    addFlag({
      title: "Error Fuentes de ingreso",
      description: `Error al traer los datos: ${error}`,
      appearance: "danger",
      duration: 5000,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prospectData = await getSearchProspectById(
          businessUnitPublicCode,
          prospectCode || ""
        );
        const borrower = prospectData.borrowers.find(
          (b) => b.borrower_type === "main_borrower"
        );

        if (borrower) {
          const getData = (name: string) =>
            borrower.borrower_properties.find((p) => p.property_name === name)
              ?.property_value;

          setIncomeData({
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
          });
        }
      } catch (error) {
        handleFlag(error);
      }
    };

    fetchData();
     // eslint-disable-next-line react-hooks/exhaustive-deps
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
      disabledNext={!isModified}
    >
      <Stack direction="column" height={isMobile ? "auto" : "510px"} gap="24px">
        <Tabs
          scroll={isMobile}
          selectedTab={currentTab}
          tabs={dataTabs}
          onChange={setCurrentTab}
        />
        {currentTab === "data" && <DataDebtor data={initialValues} />}
        {currentTab === "sources" && (
          <SourceIncome
            data={incomeData}
            showEdit={false}
            onDataChange={() => setIsModified(true)}
          />
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
