import { type TestScenario } from "../types";

interface ScenarioActionsProps {
  scenarios: TestScenario[];
  selectedScenarios: string[];
  setScenarios: (scenarios: TestScenario[]) => void;
  setSelectedScenarios: (selectedScenarios: string[]) => void;
}

export const ScenarioActions = ({
  scenarios,
  selectedScenarios,
  setScenarios,
  setSelectedScenarios
}: ScenarioActionsProps) => {
  return (
    <div className="space-x-2">
      {/* This component is intentionally empty for now */}
    </div>
  );
};
