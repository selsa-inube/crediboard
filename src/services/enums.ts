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

enum CreditLine {
  Vacation = "vacation",
  Education = "education",
  Mortgage = "mortgage",
  Personal = "personal",
  Business = "business",
  Auto = "auto",
  Health = "health",
  CreditCard = "credit_card",
  Consolidation = "consolidation",
}

enum PaymentMethod {
  MonthlyPayroll = "monthly_payroll",
  BiweeklyPayroll = "biweekly_payroll",
  BankTransfer = "bank_transfer",
  CreditCard = "credit_card",
  DebitCard = "debit_card",
  Cash = "cash",
  MobilePayment = "mobile_payment",
  Check = "check",
}

enum AmortizationType {
  FixedPayments = "fixed_payments",
  GradualPayments = "gradual_payments",
  BulletPayment = "bullet_payment",
  BalloonPayment = "balloon_payment",
  FixedPrincipal = "fixed_principal",
  InterestOnly = "interest_only",
  FixedIntegralPayments = "fixed_integral_payments",
}

enum RateType {
  Fixed = "fixed",
  Variable = "variable",
  Mixed = "mixed",
  Adjustable = "adjustable",
  Floating = "floating",
}

export {
  MaritalStatus,
  EconomicActivity,
  Schedule,
  CreditLine,
  PaymentMethod,
  AmortizationType,
  RateType,
};
