import { useEffect, useState } from "react";
import { Stack, Tabs } from "@inubekit/inubekit";

import { BaseModal } from "@components/modals/baseModal";
import { CardBorrower } from "@components/cards/CardBorrower";
import { getAllProspects } from "@services/prospects/AllProspects";
import { IProspect } from "@services/prospects/AllProspects/types";
import {
  getPropertyValue,
  getTotalFinancialObligations,
} from "@pages/SubmitCreditApplication/util";
import { currencyFormat } from "@utils/formatData/currency";

import { Mortgage } from "./Mortgage";
import { Pledge } from "./Pledge";
import { Bail } from "./bail";
import { dataGuarantee, dataTabs } from "./config";
import { ScrollableContainer } from "./styles";

export interface IOfferedGuaranteeModalProps {
  handleClose: () => void;
  isMobile: boolean;
  id: string;
  businessUnitPublicCode: string;
}

export function OfferedGuaranteeModal(props: IOfferedGuaranteeModalProps) {
  const { handleClose, isMobile, id, businessUnitPublicCode } = props;

  const [currentTab, setCurrentTab] = useState(dataTabs[0].id);
  const [data, setData] = useState<IProspect[]>([]);

  const onChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProspects(businessUnitPublicCode, id || "");
        setData(result);
      } catch (error) {
        console.error("Error al obtener los prospectos:", error);
      }
    };

    fetchData();
  }, [businessUnitPublicCode, id]);

  const dataResponse = data[0];

  return (
    <BaseModal
      title={dataGuarantee.title}
      nextButton={dataGuarantee.close}
      handleNext={handleClose}
      handleClose={handleClose}
      width={isMobile ? "300px" : "630px"}
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
        {currentTab === "mortgage" && <Mortgage isMobile={isMobile} />}
        {currentTab === "pledge" && <Pledge isMobile={isMobile} />}
        {currentTab === "bail" && <Bail data={dataResponse.bond_value || 0} />}
      </Stack>
    </BaseModal>
  );
}
