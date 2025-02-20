
export interface TestScenarioCondition {
  id: string;
  description: string;
  requirementRef: string;
}

export interface TestCase {
  id: string;
  title: string;
  scenarioId: string;
  requirementId: string;
  testData: {
    key: string;
    value: string;
  }[];
  expectedResults: string[];
}

export interface TestScenario {
  id: string;
  title: string;
  requirementId: string;
  conditions: TestScenarioCondition[];
  testCases: TestCase[];
}
