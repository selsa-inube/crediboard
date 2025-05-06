export interface IBorrowerProperty {
  property_name: string;
  property_value: string;
}

export interface IBorrower {
  borrower_name: string;
  Borrower_type: string;
  borrower_identification_type: string;
  borrower_identification_number: string;
  borrower_properties: IBorrowerProperty[];
}

export interface IConsolidatedCredit {
  CreditProductCode: string;
  ConsolidatedAmount: string;
  ConsolidatedAmountType: string;
  EstimatedDateOfConsolidation: string;
  LineOfCreditDescription: string;
  BorrowerIdentificationType: string;
  BorrowerIdentificationNumber: string;
}

export interface IOrdinaryInstallmentsForPrincipal {
  Term: string;
  NumberOfInstallments: string;
  Schedule: string;
  InstallmentAmountForCapital: string;
  InstallmentAmount: string;
  GradientRate: string;
  GradientValue: string;
  GradientSchedule: string;
  FirstGradientDate: string;
  PaymentChannelCode: string;
}

export interface IInstallmentsForInterest {
  Schedule: string;
  PaymentChannelCode: string;
}

export interface IExtraordinaryInstallment {
  InstallmentDate: string;
  InstallmentAmount: string;
  PaymentChannelCode: string;
}

export interface IAcquiredCashFlow {
  Amount: string;
  Date: string;
  PaymentChannelCode: string;
  FlowNumber: string;
}

export interface ICreditProduct {
  AbbreviatedName: string;
  CreditProductCode: string;
  LoanAmount: string;
  LineOfCreditAbbreviatedName: string;
  InterestRate: string;
  FixedPoints: string;
  LoanTerm: string;
  ScheduleType: string;
  OrdinaryInstallmentsForPrincipal: IOrdinaryInstallmentsForPrincipal;
  InstallmentsForInterest: IInstallmentsForInterest;
  ExtraordinaryInstallments: IExtraordinaryInstallment;
  AcquiredCashFlows: IAcquiredCashFlow;
}

export interface IOutlay {
  AbbreviatedName: string;
  Date: string;
  Amount: string;
}

export interface IProspect {
  ProspectId: string;
  ProspectCode: string;
  State: string;
  RequestedAmount: string;
  InstallmentLimit: string;
  TermLimit: string;
  TimeOfCreation: string;
  SelectedRegularPaymentSchedule: string;
  SelectedRateType: string;
  PreferredPaymentChannelAbbreviatedName: string;
  GracePeriod: string;
  GracePeriodType: string;
  MoneyDestinationAbbreviatedName: string;
  BondValue: string;
  borrowers: IBorrower[];
  ConsolidatedCredits: IConsolidatedCredit;
  CreditProducts: ICreditProduct;
  Outlays: IOutlay;
  bond_value: number;
}
