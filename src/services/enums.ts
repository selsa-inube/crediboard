const MaritalStatus = {
  Married: "married",
  Single: "single",
  Divorced: "divorced",
  Widowed: "widowed",
} as const;

const EconomicActivity = {
  Pensioner: "pensioner",
  Employed: "employed",
  Unemployed: "unemployed",
  Student: "student",
} as const;

enum Schedule {
  Weekly = "weekly",
  TenDayIntervals = "10-day intervals",
  Biweekly = "biweekly",
  Semimonthly = "semimonthly",
  Monthly = "monthly",
  Bimonthly = "bimonthly",
  Quarterly = "quarterly",
  Semiannually = "semiannually",
  Annually = "annually",
}

const GracePeriodType = {
  PrincipalGrace: "principal_grace",
  InterestForgiveness: "interest_forgiveness",
  InterestGrace: "interest_grace",
} as const;

const BorrowerProperties = {
  maximumIndebtednessAccordingToPaymentCapacity: "Maximum indebtedness accordlng to payment capacity",
  totalPayrollEarnings: "Total payroll earnings",
  totalPayrollDeductions: "Total payroll deductions",
  internalFinancialPortfolioObligationsWithTheEntity: "Internal financial portfolio obligations witfi the entity",
  otherInternalObligationsWithTheEntity: "Other internal obligations with the entity",
  installmentValueOfTheCurrentApplication: "Installment value of the current application",
  installmentOfInternalObligationsConsolidated: "Installment of internal obligations consolidated",
  modified: "modified",
  orExcluded: "or excluded",
  otherCreditApplicationsInProcess: "Other credit applications in process",
  legalReserveForMinimumPayment: "Leaal reserve for mínimum pavment",
  estimatedInstallmentForTheUnusedRevolvingLimit: "Estimafed installment for the unused revorving limit",
  maximumIndebtednessByReciprocity: "Maximum indebtedness by reciprocity",
  balanceOfPermanentContributionsAndSavings: "Balance of permanent contributions and savings",
  numberOfTimesPossibleAccordingToRegulations: "Number of times possible according to regulations",
  maximumIndebtednessByFRC: "Maximum indebtedness by FRC",
  numberOfTimesTheIncomeForScoring: "Number of times the income for scorin",
  creditRiskScoring: "Credit risk scoring",
  assignedIndividualIndebtedness: "Assigned individual indebtegness",
  offersGuaranteeWithCoDebtors: "Offers guarantee with co-debtors",
  offersGuaranteeWithSurety: "Offers guarantee with surety",
  offersGuaranteeWithMortgage: "Offers guarantee with mortgage",
  offersGuaranteeWithPledge: "Offers guarantee with pledge",
  insurable: "Insurable",
} as const;


export { MaritalStatus, EconomicActivity, Schedule, GracePeriodType, BorrowerProperties };
