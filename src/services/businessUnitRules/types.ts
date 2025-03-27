interface IValue {
  description: string;
}

interface ICondition {
  condition: string;
  value: IValue;
}

export interface IBusinessUnitRules {
  ruleName: string;
  conditions: ICondition[];
}
