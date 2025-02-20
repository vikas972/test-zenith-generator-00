
import { type TestScenario } from "./types";

export const createNewScenario = (scenariosLength: number): TestScenario => ({
  id: `TS-${(scenariosLength + 1).toString().padStart(3, '0')}`,
  title: "New Test Scenario",
  requirementId: "",
  conditions: []
});
