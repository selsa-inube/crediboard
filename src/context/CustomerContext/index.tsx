import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCustomers } from "@services/customers/AllCustomers";
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
    generalAttributeClientNaturalPersons: [
      { employmentType: "", associateType: "" },
    ],
  });

  useEffect(() => {
    if (id) {
      fetchCustomerData(id);
    }
  }, [id]);

  const fetchCustomerData = async (publicCode: string) => {
    try {
      const customer = await getCustomers(publicCode);

      if (customer) {
        setCustomerData({
          customerId: customer.customerId,
          publicCode: customer.publicCode,
          fullName: customer.fullName,
          natureClient: customer.natureClient,
          generalAttributeClientNaturalPersons: Array.isArray(
            customer.generalAttributeClientNaturalPersons
          )
            ? customer.generalAttributeClientNaturalPersons
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
