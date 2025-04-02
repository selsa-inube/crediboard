interface ICondition {
  condition: string;
  value: string;
}

export interface IBusinessUnitRules {
  ruleName: string;
  conditions: ICondition[];
}
