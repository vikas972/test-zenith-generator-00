
export interface TestScenarioVariation {
  id: string;
  description: string;
  requirementRef: string;
}

export interface TestScenarioCondition {
  id: string;
  title: string;
  requirementRef: string;
  variations: TestScenarioVariation[];
}

export interface TestScenario {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  requirementIds: string[];
  conditions: TestScenarioCondition[];
}
