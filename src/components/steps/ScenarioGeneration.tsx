
import React, { useState } from "react";
import { type TestScenario } from "./scenario/types";
import { RequirementsCoverage } from "./scenario/RequirementsCoverage";
import { AddScenarioDialog } from "./scenario/dialogs/AddScenarioDialog";
import { ScenarioHeader } from "./scenario/components/ScenarioHeader";
import { ScenarioList } from "./scenario/components/ScenarioList";
import { RequirementDialog } from "./scenario/dialogs/RequirementDialog";
import { ScenarioActions } from "./scenario/components/ScenarioActions";
import { useScenarioState } from "./scenario/hooks/useScenarioState";
import { toast } from "sonner";
import { ScenarioGridDialog } from "./scenario/dialogs/ScenarioGridDialog";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScenarioGenerationProps {
  selectedFile: { id: string; name: string; uploadTime: Date } | null;
}

export const ScenarioGeneration = ({ selectedFile }: ScenarioGenerationProps) => {
  const [isLeftPanelMaximized, setIsLeftPanelMaximized] = useState(false);
  const [isRightPanelMaximized, setIsRightPanelMaximized] = useState(false);

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

  const [showGridDialog, setShowGridDialog] = useState(false);

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
    toast("Scenario deleted successfully");
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

  const handleBulkDelete = () => {
    setScenarios(scenarios.filter(scenario => !selectedScenarios.includes(scenario.id)));
    setSelectedScenarios([]);
    toast("Deleted selected scenarios successfully");
  };

  const toggleLeftPanel = () => {
    setIsLeftPanelMaximized(!isLeftPanelMaximized);
    setIsRightPanelMaximized(false);
  };

  const toggleRightPanel = () => {
    setIsRightPanelMaximized(!isRightPanelMaximized);
    setIsLeftPanelMaximized(false);
  };

  return (
    <div className="flex gap-4 h-full">
      <div className={cn(
        "flex flex-col transition-all duration-300",
        isLeftPanelMaximized ? "w-full" : "w-2/3",
        isRightPanelMaximized ? "w-0 hidden" : "flex"
      )}>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <ScenarioHeader
              selectedScenariosCount={selectedScenarios.length}
              totalScenariosCount={scenarios.length}
              onSelectAll={handleSelectAll}
              onAddScenario={() => setShowAddDialog(true)}
              onBulkStatusChange={handleBulkStatusChange}
              onBulkDelete={handleBulkDelete}
              onShowGrid={() => setShowGridDialog(true)}
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="mr-2"
            onClick={toggleLeftPanel}
          >
            {isLeftPanelMaximized ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>

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

      <div className={cn(
        "flex flex-col transition-all duration-300",
        isRightPanelMaximized ? "w-full" : "w-1/3",
        isLeftPanelMaximized ? "w-0 hidden" : "flex"
      )}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Requirements Coverage</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleRightPanel}
          >
            {isRightPanelMaximized ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          <RequirementsCoverage
            scenarios={scenarios}
            selectedScenario={selectedScenario}
            onRequirementClick={handleRequirementClick}
          />
        </div>
      </div>

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

      <ScenarioGridDialog
        open={showGridDialog}
        onOpenChange={setShowGridDialog}
        scenarios={scenarios}
      />
    </div>
  );
};
