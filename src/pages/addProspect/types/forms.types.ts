interface IMessage {
  show?: boolean;
  title: string;
  description: string;
  icon: JSX.Element;
  appearance: string;
}

interface IAssignmentFormEntry {
  id: string;
  value: string;
  isActive: boolean;
}

interface IFormsInvitation {
  generalInformation: {entries?: [] };
  branches: { entries: IAssignmentFormEntry[] };
  projects: { entries: IAssignmentFormEntry[] };
  events: { entries: IAssignmentFormEntry[] };
  aidBudgetUnits: { entries: IAssignmentFormEntry[] };
  payrolls: { entries: IAssignmentFormEntry[] };
}

interface IMessageState {
  visible: boolean;
  data?: IMessage;
  type?: string;
}

interface LoanConditionState {
  toggles: {
    quotaCapToggle: boolean;
    maximumTermToggle: boolean;
  };
  quotaCapValue: string;
  maximumTermValue: string;
}

export type { IFormsInvitation, IAssignmentFormEntry, IMessageState, IMessage, LoanConditionState };
