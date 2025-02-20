
export interface TestScenarioCondition {
  id: string;
  description: string;
  requirementRef: string;
  coverageType: "business_requirement" | "business_rule" | "data_element";
  requirementItemId: string;
}

export interface TestScenario {
  id: string;
  title: string;
  requirementId: string;
  conditions: TestScenarioCondition[];
}
