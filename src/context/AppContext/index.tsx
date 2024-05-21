import { createContext, useState, useEffect } from "react";

import linparLogo from "@assets/images/linpar.png";
import { useAuth } from "@inube/auth";
import { SectionOrientation } from "@src/components/layout/BoardSection/types";

import {
  IAppContext,
  AppContextProviderProps,
  IClient,
  IPreferences,
} from "./types";

export const AppContext = createContext<IAppContext>({
  user: {
    username: "",
    id: "",
    company: "",
    operator: { name: "", logo: "" },
    preferences: {
      boardOrientation: "vertical",
      showPinnedOnly: false,
    },
  },
  handleClientChange: () => {},
  updatePreferences: () => {},
});

export default function AppContextProvider(props: AppContextProviderProps) {
  const { children } = props;
  const { user } = useAuth();
  const [clientSigla, setClientSigla] = useState(
    localStorage.getItem("clientSigla") || ""
  );

  const [preferences, setPreferences] = useState<IPreferences>({
    boardOrientation: (localStorage.getItem("boardOrientation") ||
      "vertical") as SectionOrientation,
    showPinnedOnly:
      JSON.parse(localStorage.getItem("showPinnedOnly")!) || false,
  });

  function handleClientChange(client: IClient) {
    const { sigla } = client;
    setClientSigla(sigla);
  }

  function updatePreferences(newPreferences: Partial<IPreferences>) {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  }

  useEffect(() => {
    localStorage.setItem("clientSigla", clientSigla);
  }, [clientSigla]);

  useEffect(() => {
    localStorage.setItem("boardOrientation", preferences.boardOrientation);
    localStorage.setItem(
      "showPinnedOnly",
      JSON.stringify(preferences.showPinnedOnly)
    );
  }, [preferences]);

  const company = clientSigla;

  const userContext: IAppContext = {
    user: {
      username: `${user?.firstName + " " + user?.firstLastName}`,
      id: "abc123",
      company: company,
      operator: {
        name: "Linpar",
        logo: linparLogo,
      },
      preferences,
    },
    handleClientChange,
    updatePreferences,
  };

  return (
    <AppContext.Provider value={userContext}>{children}</AppContext.Provider>
  );
}
