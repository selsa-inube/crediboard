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

export { MaritalStatus, EconomicActivity, Schedule };
