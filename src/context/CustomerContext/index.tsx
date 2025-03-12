import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCustomer } from "@services/customers";
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

  const fetchCustomerData = async (publicCode: string) => {
    try {
      const customers = await getCustomer();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const customer = customers.find((c: any) => c.publicCode === publicCode);

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
