
export type FlowType = "primary" | "alternate" | "negative" | "exception";
export type Priority = "high" | "medium" | "low";
export type ScenarioStatus = "completed" | "needs_review" | "in_progress";

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
  description: string; // Added this field
  requirementId: string;
  priority: Priority;
  status?: ScenarioStatus;
  flows: TestScenarioFlow[];
}
