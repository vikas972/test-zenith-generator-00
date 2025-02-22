
import { type TestScenario } from "../types";
import { ScenarioCard } from "../ScenarioCard";

interface ScenarioListProps {
  scenarios: TestScenario[];
  selectedScenario: string | null;
  selectedScenarios: string[];
  onScenarioClick: (scenarioId: string) => void;
  setSelectedScenarios: (selectedScenarios: string[]) => void;
}

export const ScenarioList = ({
  scenarios,
  selectedScenario,
  selectedScenarios,
  onScenarioClick,
  setSelectedScenarios,
}: ScenarioListProps) => {
  return (
    <div className="space-y-4">
      {scenarios.map((scenario) => (
        <ScenarioCard
          key={scenario.id}
          scenario={scenario}
          isSelected={selectedScenario === scenario.id}
          onScenarioClick={onScenarioClick}
          isChecked={selectedScenarios.includes(scenario.id)}
          onToggleSelect={(checked) => {
            if (checked) {
              setSelectedScenarios([...selectedScenarios, scenario.id]);
            } else {
              setSelectedScenarios(selectedScenarios.filter(id => id !== scenario.id));
            }
          }}
        />
      ))}
    </div>
  );
};
