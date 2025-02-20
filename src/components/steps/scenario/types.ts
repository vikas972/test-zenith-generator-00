
export type FlowType = "primary" | "alternate" | "negative" | "exception";
export type Priority = "high" | "medium" | "low";

export interface TestFlow {
  description: string;
  coverage: string[];
  expectedResults: string;
}

export interface TestScenarioFlow {
  type: FlowType;
  description: string;
  subflows: {
    name: string;
    coverage: string;
    expectedResults: string;
    entries?: Array<{ description: string }>;
  }[];
}

export interface TestScenario {
  id: string;
  title: string;
  requirementId: string;
  priority: Priority;
  flows: TestScenarioFlow[];
}
