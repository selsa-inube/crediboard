import { createContext, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { getCustomers } from "@services/customers/AllCustomers";
import { getSearchAllProspect } from "@services/prospects";
import { AppContext } from "@context/AppContext";

import { ICustomerContext, ICustomerData } from "./types";

export const CustomerContext = createContext<ICustomerContext>(
  {} as ICustomerContext
);

interface ICustomerContextProviderProps {
  children: React.ReactNode;
}

export function CustomerContextProvider({
  children,
}: ICustomerContextProviderProps) {
  const { id, prospectCode } = useParams();
  const [customerData, setCustomerData] = useState<ICustomerData>({
    customerId: "",
    publicCode: "",
    fullName: "",
    natureClient: "",
    generalAttributeClientNaturalPersons: [
      {
        employmentType: "",
        associateType: "",
        typeIdentification: "",
        firstNames: "",
        lastNames: "",
        emailContact: "",
        cellPhoneContact: "",
      },
    ],
    generalAssociateAttributes: [
      {
        affiliateSeniorityDate: "",
        partnerStatus: "",
      },
    ],
  });

  const { businessUnitSigla } = useContext(AppContext);

  const businessUnitPublicCode: string =
    JSON.parse(businessUnitSigla).businessUnitPublicCode;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        fetchCustomerData(id);
      } else if (prospectCode) {
        const prospects = await getSearchAllProspect(
          businessUnitPublicCode,
          prospectCode
        );
        const mainBorrower = prospects.borrowers.find(
          (borrower) => borrower.borrower_type === "main_borrower"
        );

        if (mainBorrower?.borrower_identification_number) {
          fetchCustomerData(mainBorrower.borrower_identification_number);
        }
      }
    };
    fetchData();
  }, [id, prospectCode, businessUnitPublicCode]);

  const fetchCustomerData = async (publicCode: string) => {
    try {
      const customers = await getCustomers(publicCode);

      if (customers) {
        setCustomerData({
          customerId: customers.customerId,
          publicCode: customers.publicCode,
          fullName: customers.fullName,
          natureClient: customers.natureClient,
          generalAttributeClientNaturalPersons: Array.isArray(
            customers.generalAttributeClientNaturalPersons
          )
            ? customers.generalAttributeClientNaturalPersons
            : [],
          generalAssociateAttributes: Array.isArray(
            customers.generalAssociateAttributes
          )
            ? customers.generalAssociateAttributes
            : [],
        });
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  return (
    <CustomerContext.Provider value={{ customerData }}>
      {children}
    </CustomerContext.Provider>
  );
}
