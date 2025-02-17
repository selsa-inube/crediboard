import { createContext } from "react";

import { IAppContext } from "./types";
import { useAppContext } from "@hooks/useAppContext";

const AppContext = createContext<IAppContext>({} as IAppContext);

interface ICrediboardProviderProps {
  children: React.ReactNode;
}

function AppContextProvider(props: ICrediboardProviderProps) {
  const { children } = props;
  const appContext = useAppContext();

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
}

export { AppContext, AppContextProvider };
