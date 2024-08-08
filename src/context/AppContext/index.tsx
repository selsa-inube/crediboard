import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import linparLogo from "@assets/images/linpar.png";
import { SectionOrientation } from "@components/layout/BoardSection/types";

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
  const { user } = useAuth0();
  const [clientSigla, setClientSigla] = useState(
    localStorage.getItem("clientSigla") || ""
  );

  const [preferences, setPreferences] = useState<IPreferences>({
    boardOrientation: (localStorage.getItem("boardOrientation") ||
      "vertical") as SectionOrientation,
    showPinnedOnly:
      JSON.parse(localStorage.getItem("showPinnedOnly")!) || false,
  });

  const initialClientLogo = localStorage.getItem("clientLogo") || linparLogo;
  const[clientLogo, setClientLogo] = useState<string>(initialClientLogo);

  function handleClientChange(client: IClient) {
    const { sigla, logo } = client;
    setClientSigla(sigla);
    setClientLogo(logo);
  }

  function updatePreferences(newPreferences: Partial<IPreferences>) {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  }

  useEffect(() => {
    localStorage.setItem("clientSigla", clientSigla);
    localStorage.setItem("clientLogo", clientLogo);
  }, [clientSigla, clientLogo]);

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
      username: `${user?.name}`,
      id: "abc123",
      company: company,
      operator: {
        name: "Linpar",
        logo: clientLogo,
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
