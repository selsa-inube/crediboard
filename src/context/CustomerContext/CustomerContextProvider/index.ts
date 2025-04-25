import { createContext } from "react";

import { ICustomerContext } from "../types";

export const CustomerContext = createContext<ICustomerContext>(
  {} as ICustomerContext
);
