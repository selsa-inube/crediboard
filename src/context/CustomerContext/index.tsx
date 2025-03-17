import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getCustomer } from "@services/customers";
import { mockProspectCode } from "@mocks/filing-application/prospect-code/prospectcode.mock";

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
  const { id } = useParams();
  const [customerData, setCustomerData] = useState<ICustomerData>({
    customerId: "",
    publicCode: "",
    fullName: "",
    natureClient: "",
  });

  useEffect(() => {
    if (id) {
      fetchCustomerData(id);
    }
  }, [id]);

  const fetchCustomerData = async (idParam: string) => {
    try {
      const prospect = mockProspectCode.find((p) => p.code === idParam);
      const searchPublicCode = prospect ? prospect.identification : idParam;

      const customers = await getCustomer();
      const customer = customers.find((c) => c.publicCode === searchPublicCode);

      if (customer) {
        setCustomerData({
          customerId: customer.customerId,
          publicCode: customer.publicCode,
          fullName: customer.fullName,
          natureClient: customer.natureClient,
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
