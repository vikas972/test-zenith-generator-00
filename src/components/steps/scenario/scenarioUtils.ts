
import { type TestScenario } from "./types";

export const createNewScenario = (scenariosLength: number): TestScenario => ({
  id: `TS-${(scenariosLength + 1).toString().padStart(3, '0')}`,
  title: "New Test Scenario",
  requirementId: "",
  conditions: [],
  testCases: []
});

export const getScenarioStatusColor = (testCases: TestScenario["testCases"]) => {
  if (testCases.length === 0) return "text-gray-500";
  const hasFailedTests = testCases.some(tc => tc.expectedResults.length === 0);
  if (hasFailedTests) return "text-red-500";
  return "text-green-500";
};
