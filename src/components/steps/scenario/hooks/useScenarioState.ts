
import { useState } from "react";
import { type TestScenario, type ScenarioStatus } from "../types";
import { useToast } from "@/components/ui/use-toast";
import { initialScenarios } from "../scenarioData";

export const useScenarioState = () => {
  const { toast } = useToast();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [expandedScenarios, setExpandedScenarios] = useState<string[]>([]);
  const [scenarios, setScenarios] = useState<TestScenario[]>(initialScenarios);
  const [showRequirementDialog, setShowRequirementDialog] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<string | null>(null);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingScenario, setEditingScenario] = useState<TestScenario | null>(null);

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

  const handleSaveNewScenario = (newScenario: Omit<TestScenario, "id">) => {
    if (editingScenario) {
      const updatedScenario = {
        ...editingScenario,
        ...newScenario
      };
      setScenarios(prev => prev.map(s => 
        s.id === editingScenario.id ? updatedScenario : s
      ));
      toast({
        title: "Success",
        description: "Scenario updated successfully"
      });
    } else {
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
    }
    setShowAddDialog(false);
    setEditingScenario(null);
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

  return {
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
  };
};
