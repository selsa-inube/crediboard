import { SectionOrientation } from "@components/layout/BoardSection/types";
interface IOperator {
  name: string;
  logo: string;
}

interface IPreferences {
  boardOrientation: SectionOrientation;
  showPinnedOnly: boolean;
}

interface IUser {
  username: string;
  id: string;
  company: string;
  operator: IOperator;
  preferences: IPreferences;
}

interface IClient {
  id: string;
  name: string;
  sigla: string;
  logo: string;
}

interface IAppContext {
  user: IUser;
  handleClientChange: (client: IClient) => void;
  updatePreferences: (newPreferences: Partial<IPreferences>) => void;
}

interface AppContextProviderProps {
  children: React.ReactNode;
}

export type { IAppContext, IClient, AppContextProviderProps, IPreferences };
