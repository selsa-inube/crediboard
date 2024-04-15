export const AppearenceTagObject = {
  Cumple: "success",
  "No Cumple": "error",
  "Sin Evaluar": "warning",
} as const;

export interface ITitle {
  id: string;
  titleName: string;
  priority: number;
}

export interface IAction {
  id: string;
  actionName: string;
  content: (entry: IEntries) => React.ReactNode;
  mobilePriority?: boolean;
}

interface IRequirements {
  id: string;
  description: string;
  tag: "Cumple" | "No Cumple" | "Sin Evaluar";
}

interface ISection {
  title: string;
  requirements: IRequirements[];
  priority: number;
  validations: boolean;
}

export interface IEntries {
  section: ISection;
}

export interface ITableBoardProps {
  id: string;
  withTitles: boolean;
  colspan?: string;
  entries: IEntries[];
}

export interface IEntriesTranform {
  id: string;
  [key: string]: string;
}
