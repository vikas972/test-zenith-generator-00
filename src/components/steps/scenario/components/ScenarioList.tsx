
import { type TestScenario } from "../types";
import { ScenarioCard } from "../ScenarioCard";
import { useState } from "react";

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
  // Track expanded scenarios locally
  const [expandedScenarios, setExpandedScenarios] = useState<string[]>([]);

  const handleEditScenario = (e: React.MouseEvent, _: string) => {
    e.stopPropagation();
    // No-op for now, but required by props
  };

  const handleDeleteScenario = (e: React.MouseEvent, _: string) => {
    e.stopPropagation();
    // No-op for now, but required by props
  };

  const handleUpdateScenario = (updatedScenario: TestScenario) => {
    // No-op for now, but required by props
  };

  const handleRequirementClick = (requirementId: string) => {
    // No-op for now, but required by props
  };

  return (
    <div className="space-y-4">
      {scenarios.map((scenario) => (
        <ScenarioCard
          key={scenario.id}
          scenario={scenario}
          isSelected={selectedScenario === scenario.id}
          isExpanded={expandedScenarios.includes(scenario.id)}
          onScenarioClick={onScenarioClick}
          onRequirementClick={handleRequirementClick}
          onEdit={handleEditScenario}
          onDelete={handleDeleteScenario}
          onUpdateScenario={handleUpdateScenario}
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
