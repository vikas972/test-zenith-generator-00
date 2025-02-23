
export interface TestCase {
  id: string;
  title: string;
  scenarioId: string;
  requirementId: string;
  priority: "high" | "medium" | "low";
  description: string;
  preconditions: string[];
  testData: {
    field: string;
    value: string;
  }[];
  testSteps: {
    step: string;
    input: string;
    expected: string;
  }[];
  expectedResults: string[];
  postconditions: string[];
  status: "completed" | "in_progress" | "needs_review";
}

export interface TestCasesProps {
  selectedFile: { id: string; name: string; uploadTime: Date } | null;
}

export interface CoverageStats {
  scenarioCoverage: number;
  requirementCoverage: number;
  testCaseCount: number;
  scenarioCount: number;
}
