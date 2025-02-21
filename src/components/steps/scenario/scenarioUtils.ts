
import { type TestScenario } from "./types";

export const createNewScenario = (scenariosLength: number): TestScenario => ({
  id: `TS-${(scenariosLength + 1).toString().padStart(3, '0')}`,
  title: "New Test Scenario",
  description: "Default description for the new test scenario",
  requirementId: "",
  priority: "medium",
  flows: [
    {
      type: "primary",
      description: "Standard flow",
      subflows: [
        {
          name: "Main Flow",
          coverage: "Basic functionality",
          expectedResults: "Expected behavior"
        }
      ]
    }
  ]
});
