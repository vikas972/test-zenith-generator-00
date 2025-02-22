
import { type TestScenario } from "../types";
import { ScenarioCard } from "../ScenarioCard";
import React from "react";

interface ScenarioListProps {
  scenarios: TestScenario[];
  selectedScenario: string | null;
  expandedScenarios: string[];
  selectedScenarios: string[];
  onScenarioClick: (scenarioId: string) => void;
  onRequirementClick: (requirementId: string) => void;
  onEditScenario: (e: React.MouseEvent, scenarioId: string) => void;
  onDeleteScenario: (e: React.MouseEvent, scenarioId: string) => void;
  onUpdateScenario: (updatedScenario: TestScenario) => void;
  onToggleSelect: (scenarioId: string, checked: boolean) => void;
}

export const ScenarioList = ({
  scenarios = [],
  selectedScenario,
  expandedScenarios = [],
  selectedScenarios = [],
  onScenarioClick,
  onRequirementClick,
  onEditScenario,
  onDeleteScenario,
  onUpdateScenario,
  onToggleSelect,
}: ScenarioListProps) => {
  return (
    <div className="space-y-4">
      {scenarios.map((scenario) => (
        <ScenarioCard
          key={scenario.id}
          scenario={scenario}
          isSelected={selectedScenario === scenario.id}
          isExpanded={expandedScenarios.includes(scenario.id)}
          onScenarioClick={onScenarioClick}
          onRequirementClick={onRequirementClick}
          onEdit={onEditScenario}
          onDelete={onDeleteScenario}
          onUpdateScenario={onUpdateScenario}
          isChecked={selectedScenarios.includes(scenario.id)}
          onToggleSelect={onToggleSelect}
        />
      ))}
    </div>
  );
};
