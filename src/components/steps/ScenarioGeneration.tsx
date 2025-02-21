
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { type TestScenario, type ScenarioStatus } from "./scenario/types";
import { RequirementsCoverage } from "./scenario/RequirementsCoverage";
import { AddScenarioDialog } from "./scenario/dialogs/AddScenarioDialog";
import { ScenarioHeader } from "./scenario/components/ScenarioHeader";
import { ScenarioList } from "./scenario/components/ScenarioList";
import { RequirementDialog } from "./scenario/dialogs/RequirementDialog";
import { initialScenarios } from "./scenario/scenarioData";

interface ScenarioGenerationProps {
  selectedFile: { id: string; name: string; uploadTime: Date } | null;
}

export const ScenarioGeneration = ({ selectedFile }: ScenarioGenerationProps) => {
  const { toast } = useToast();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [expandedScenarios, setExpandedScenarios] = useState<string[]>([]);
  const [scenarios, setScenarios] = useState<TestScenario[]>(initialScenarios);
  const [showRequirementDialog, setShowRequirementDialog] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<string | null>(null);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleScenarioClick = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    setExpandedScenarios(prev => 
      prev.includes(scenarioId) 
        ? prev.filter(id => id !== scenarioId)
        : [...prev, scenarioId]
    );
  };

  const handleRequirementClick = (requirementId: string) => {
    setSelectedRequirement(requirementId);
    setShowRequirementDialog(true);
  };

  const handleAddScenario = () => {
    setShowAddDialog(true);
  };

  const handleSaveNewScenario = (newScenario: Omit<TestScenario, "id">) => {
    const id = `TS-${String(scenarios.length + 1).padStart(3, '0')}`;
    const scenarioToAdd: TestScenario = {
      id,
      ...newScenario
    };
    
    setScenarios(prev => [...prev, scenarioToAdd]);
    toast({
      title: "Success",
      description: "New scenario added"
    });
  };

  const handleEditScenario = (e: React.MouseEvent, scenarioId: string) => {
    e.stopPropagation();
    toast({
      title: "Success",
      description: "Edit scenario"
    });
  };

  const handleDeleteScenario = (e: React.MouseEvent, scenarioId: string) => {
    e.stopPropagation();
    setScenarios(prev => prev.filter(scenario => scenario.id !== scenarioId));
    setSelectedScenarios(prev => prev.filter(id => id !== scenarioId));
    toast({
      title: "Success",
      description: "Scenario deleted"
    });
  };

  const handleUpdateScenario = (updatedScenario: TestScenario) => {
    setScenarios(prev =>
      prev.map(scenario =>
        scenario.id === updatedScenario.id ? updatedScenario : scenario
      )
    );
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
    if (selectedScenarios.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one scenario to delete",
        variant: "destructive",
      });
      return;
    }

    setScenarios(prev => prev.filter(scenario => !selectedScenarios.includes(scenario.id)));
    setSelectedScenarios([]);
    toast({
      title: "Success",
      description: `Deleted ${selectedScenarios.length} scenarios`
    });
  };

  const handleBulkStatusChange = (newStatus: ScenarioStatus) => {
    if (selectedScenarios.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one scenario",
        variant: "destructive",
      });
      return;
    }

    setScenarios(prev =>
      prev.map(scenario =>
        selectedScenarios.includes(scenario.id)
          ? { ...scenario, status: newStatus }
          : scenario
      )
    );

    toast({
      title: "Success",
      description: `Updated status for ${selectedScenarios.length} scenarios`
    });
  };

  return (
    <div className="flex gap-4 h-full">
      <div className="w-2/3 flex flex-col">
        <ScenarioHeader
          selectedScenariosCount={selectedScenarios.length}
          totalScenariosCount={scenarios.length}
          onSelectAll={handleSelectAll}
          onAddScenario={handleAddScenario}
          onBulkStatusChange={handleBulkStatusChange}
          onBulkDelete={handleBulkDelete}
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
      />
    </div>
  );
};
