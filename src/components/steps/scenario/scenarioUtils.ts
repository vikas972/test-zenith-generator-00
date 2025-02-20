
import { type TestScenario } from "./types";

export const createNewScenario = (scenariosLength: number): TestScenario => ({
  id: `TS-${(scenariosLength + 1).toString().padStart(3, '0')}`,
  title: "New Test Scenario",
  priority: "Medium",
  requirementIds: [],
  conditions: []
});

export const getPriorityColor = (priority: TestScenario["priority"]) => {
  switch (priority) {
    case "High":
      return "text-red-500";
    case "Medium":
      return "text-yellow-500";
    case "Low":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};
