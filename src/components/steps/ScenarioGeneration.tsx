
import { type TestScenario } from "./scenario/types";
import { RequirementsCoverage } from "./scenario/RequirementsCoverage";
import { AddScenarioDialog } from "./scenario/dialogs/AddScenarioDialog";
import { ScenarioHeader } from "./scenario/components/ScenarioHeader";
import { ScenarioList } from "./scenario/components/ScenarioList";
import { RequirementDialog } from "./scenario/dialogs/RequirementDialog";
import { ScenarioActions } from "./scenario/components/ScenarioActions";
import { useScenarioState } from "./scenario/hooks/useScenarioState";

interface ScenarioGenerationProps {
  selectedFile: { id: string; name: string; uploadTime: Date } | null;
}

export const ScenarioGeneration = ({ selectedFile }: ScenarioGenerationProps) => {
  const {
    scenarios,
    selectedScenario,
    expandedScenarios,
    showRequirementDialog,
    selectedRequirement,
    selectedScenarios,
    showAddDialog,
    editingScenario,
    setScenarios,
    setShowAddDialog,
    setShowRequirementDialog,
    setSelectedScenarios,
    setEditingScenario,
    handleScenarioClick,
    handleRequirementClick,
    handleSaveNewScenario,
    handleBulkStatusChange
  } = useScenarioState();

  const handleEditScenario = (e: React.MouseEvent, scenarioId: string) => {
    e.stopPropagation();
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setEditingScenario(scenario);
      setShowAddDialog(true);
    }
  };

  const handleDeleteScenario = (e: React.MouseEvent, scenarioId: string) => {
    e.stopPropagation();
    setScenarios(scenarios.filter(scenario => scenario.id !== scenarioId));
    setSelectedScenarios(selectedScenarios.filter(id => id !== scenarioId));
    toast({
      title: "Success",
      description: "Scenario deleted"
    });
  };

  const handleUpdateScenario = (updatedScenario: TestScenario) => {
    setScenarios(scenarios.map(scenario =>
      scenario.id === updatedScenario.id ? updatedScenario : scenario
    ));
  };

  const handleSelectScenario = (scenarioId: string, checked: boolean) => {
    setSelectedScenarios(prev =>
      checked
        ? [...prev, scenarioId]
        : prev.filter(id => id !== scenarioId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedScenarios(checked ? scenarios.map(s => s.id) : []);
  };

  return (
    <div className="flex gap-4 h-full">
      <div className="w-2/3 flex flex-col">
        <ScenarioHeader
          selectedScenariosCount={selectedScenarios.length}
          totalScenariosCount={scenarios.length}
          onSelectAll={handleSelectAll}
          onAddScenario={() => setShowAddDialog(true)}
          onBulkStatusChange={handleBulkStatusChange}
        />

        <ScenarioActions
          scenarios={scenarios}
          selectedScenarios={selectedScenarios}
          setScenarios={setScenarios}
          setSelectedScenarios={setSelectedScenarios}
        />

        <ScenarioList
          scenarios={scenarios}
          selectedScenario={selectedScenario}
          expandedScenarios={expandedScenarios}
          selectedScenarios={selectedScenarios}
          onScenarioClick={handleScenarioClick}
          onRequirementClick={handleRequirementClick}
          onEditScenario={handleEditScenario}
          onDeleteScenario={handleDeleteScenario}
          onUpdateScenario={handleUpdateScenario}
          onToggleSelect={handleSelectScenario}
        />
      </div>

      <RequirementsCoverage
        scenarios={scenarios}
        selectedScenario={selectedScenario}
        onRequirementClick={handleRequirementClick}
      />

      <RequirementDialog
        open={showRequirementDialog}
        onOpenChange={setShowRequirementDialog}
        selectedRequirement={selectedRequirement}
      />

      <AddScenarioDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSave={handleSaveNewScenario}
        requirementId={selectedRequirement || "REQ-001"}
        editingScenario={editingScenario}
      />
    </div>
  );
};
