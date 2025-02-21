import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { type TestScenario, type ScenarioStatus } from "./scenario/types";
import { RequirementsCoverage } from "./scenario/RequirementsCoverage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { initialScenarios } from "./scenario/scenarioData";
import { AddScenarioDialog } from "./scenario/dialogs/AddScenarioDialog";
import { ScenarioHeader } from "./scenario/components/ScenarioHeader";
import { ScenarioList } from "./scenario/components/ScenarioList";

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

  const getRequirementDetails = (requirementId: string) => {
    return {
      id: requirementId,
      functionalArea: "User Authentication",
      description: "System shall provide secure user authentication mechanisms",
      actors: ["End User", "System"],
      businessRequirements: [
        { id: "br1", description: "System shall authenticate users" },
        { id: "br2", description: "System shall validate credentials" },
        { id: "br3", description: "System shall manage sessions" }
      ],
      businessRules: [
        { id: "rule1", description: "Password must be at least 8 characters", category: "security" },
        { id: "rule2", description: "Account locks after 3 failed attempts", category: "security" },
        { id: "rule3", description: "Session expires after 30 minutes", category: "security" }
      ],
      dataElements: [
        { id: "de1", name: "Username", type: "string", required: true, specifications: ["Must be email format"] },
        { id: "de2", name: "Password", type: "string", required: true, specifications: ["Min 8 characters", "1 special character"] }
      ],
      status: "needs_review" as const,
      confidence: 0.85,
    };
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

      <Dialog open={showRequirementDialog} onOpenChange={setShowRequirementDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Requirement Details</DialogTitle>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto">
            {selectedRequirement && (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">
                    {selectedRequirement}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    Confidence: {Math.round(getRequirementDetails(selectedRequirement).confidence * 100)}%
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Functional Area */}
                  <div>
                    <h4 className="font-medium mb-2">Functional Area</h4>
                    <p className="text-sm text-gray-600">
                      {getRequirementDetails(selectedRequirement).functionalArea}
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-gray-600">
                      {getRequirementDetails(selectedRequirement).description}
                    </p>
                  </div>

                  {/* Actors */}
                  <div>
                    <h4 className="font-medium mb-2">Actors</h4>
                    <div className="flex gap-2">
                      {getRequirementDetails(selectedRequirement).actors.map((actor, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm">
                          {actor}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Business Requirements */}
                  <div>
                    <h4 className="font-medium mb-2">Business Requirements</h4>
                    <ul className="space-y-2">
                      {getRequirementDetails(selectedRequirement).businessRequirements.map((req) => (
                        <li key={req.id} className="text-sm text-gray-600">
                          {req.description}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Business Rules */}
                  <div>
                    <h4 className="font-medium mb-2">Business Rules</h4>
                    <ul className="space-y-2">
                      {getRequirementDetails(selectedRequirement).businessRules.map((rule) => (
                        <li key={rule.id} className="text-sm">
                          <span className="text-gray-600">{rule.description}</span>
                          <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded text-xs">
                            {rule.category}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Data Elements */}
                  <div>
                    <h4 className="font-medium mb-2">Data Elements</h4>
                    <div className="space-y-3">
                      {getRequirementDetails(selectedRequirement).dataElements.map((element) => (
                        <div key={element.id} className="p-3 border rounded">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{element.name}</span>
                            <span className="text-sm text-gray-500">{element.type}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {element.specifications.map((spec, index) => (
                              <div key={index}>{spec}</div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AddScenarioDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSave={handleSaveNewScenario}
        requirementId={selectedRequirement || "REQ-001"}
      />
    </div>
  );
};

export default Index;
