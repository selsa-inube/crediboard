import { useEffect, useState } from "react";
import { Stack, Tabs, useFlag } from "@inubekit/inubekit";

import { BaseModal } from "@components/modals/baseModal";
import { CardBorrower } from "@components/cards/CardBorrower";
import { getGuaranteesById } from "@services/credit-request/query/guarantees";
import { IGuarantees } from "@services/credit-request/query/guarantees/types";
import { IProspect } from "@services/prospects/types";
import { getTotalFinancialObligations } from "@pages/SubmitCreditApplication/util";
import { currencyFormat } from "@utils/formatData/currency";
import { getPropertyValue } from "@utils/mappingData/mappings";

import { Mortgage } from "./Mortgage";
import { Pledge } from "./Pledge";
import { Bail } from "./bail";
import { dataGuarantee, dataTabs } from "./config";
import { ScrollableContainer } from "./styles";

export interface IOfferedGuaranteeModalProps {
  handleClose: () => void;
  isMobile: boolean;
  prospectData: IProspect;
  businessUnitPublicCode: string;
  requestId: string;
}

export function OfferedGuaranteeModal(props: IOfferedGuaranteeModalProps) {
  const {
    handleClose,
    isMobile,
    prospectData,
    businessUnitPublicCode,
    requestId,
  } = props;

  const [currentTab, setCurrentTab] = useState(dataTabs[0].id);
  const [dataProperty, setDataProperty] = useState<IGuarantees[]>();

  const onChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  const dataResponse = prospectData;

  const { addFlag } = useFlag();

  const handleFlag = (error: unknown) => {
    addFlag({
      title: "Error al obtener los datos de la garantia",
      description: `${error}`,
      appearance: "danger",
      duration: 5000,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getGuaranteesById(
          businessUnitPublicCode,
          requestId
        );
        setDataProperty(result);
      } catch (error) {
        handleFlag(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessUnitPublicCode, requestId]);

  const [pledgeData, mortgageData] = [
    dataProperty?.find((i) => i.guaranteeType === "pledge")?.pledges ?? [],
    dataProperty?.find((i) => i.guaranteeType === "mortgage")?.mortgages ?? [],
  ];

  return (
    <BaseModal
      title={dataGuarantee.title}
      nextButton={dataGuarantee.close}
      handleNext={handleClose}
      handleClose={handleClose}
      width={isMobile ? "300px" : "602px"}
      height="529px"
      finalDivider={true}
    >
      <Stack>
        <Tabs
          scroll={isMobile}
          selectedTab={currentTab}
          tabs={dataTabs}
          onChange={onChange}
        />
      </Stack>
      <Stack width="100%">
        {currentTab === "borrower" && dataResponse ? (
          <ScrollableContainer>
            {dataResponse.borrowers.map((borrower, index) => (
              <Stack
                key={index}
                justifyContent="center"
                margin="8px 0px"
                width="100%"
              >
                <CardBorrower
                  key={index}
                  title={`${dataGuarantee.borrower} ${index + 1}`}
                  name={getPropertyValue(borrower.borrower_properties, "name")}
                  lastName={getPropertyValue(
                    borrower.borrower_properties,
                    "surname"
                  )}
                  email={getPropertyValue(
                    borrower.borrower_properties,
                    "email"
                  )}
                  income={currencyFormat(
                    Number(
                      getPropertyValue(
                        borrower.borrower_properties,
                        "PeriodicSalary"
                      ) || 0
                    ) +
                      Number(
                        getPropertyValue(
                          borrower.borrower_properties,
                          "OtherNonSalaryEmoluments"
                        ) || 0
                      ) +
                      Number(
                        getPropertyValue(
                          borrower.borrower_properties,
                          "PensionAllowances"
                        ) || 0
                      ),
                    false
                  )}
                  obligations={currencyFormat(
                    getTotalFinancialObligations(borrower.borrower_properties),
                    false
                  )}
                  showIcons={false}
                />
              </Stack>
            ))}
          </ScrollableContainer>
        ) : (
          <></>
        )}
        {currentTab === "mortgage" && (
          <Mortgage isMobile={isMobile} initialValues={mortgageData} />
        )}
        {currentTab === "pledge" && (
          <Pledge isMobile={isMobile} initialValues={pledgeData} />
        )}
        {currentTab === "bail" && <Bail data={dataResponse.bond_value || 0} />}
      </Stack>
    </BaseModal>
  );
}
