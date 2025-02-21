import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { type TestScenario, type ScenarioStatus } from "./scenario/types";
import { ScenarioCard } from "./scenario/ScenarioCard";
import { RequirementsCoverage } from "./scenario/RequirementsCoverage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { initialScenarios } from "./scenario/scenarioData";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={selectedScenarios.length === scenarios.length}
              onClick={(e) => e.stopPropagation()}
              onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
            />
            <h2 className="text-lg font-semibold">Test Scenarios</h2>
          </div>
          <div className="flex items-center gap-2">
            {selectedScenarios.length > 0 && (
              <>
                <Select onValueChange={handleBulkStatusChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="in_review">In Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleBulkDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </>
            )}
            <Button onClick={handleAddScenario}>
              <Plus className="h-4 w-4 mr-2" />
              Add Scenario
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {scenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              isSelected={selectedScenario === scenario.id}
              isExpanded={expandedScenarios.includes(scenario.id)}
              onScenarioClick={handleScenarioClick}
              onRequirementClick={handleRequirementClick}
              onEdit={handleEditScenario}
              onDelete={handleDeleteScenario}
              onUpdateScenario={handleUpdateScenario}
              isChecked={selectedScenarios.includes(scenario.id)}
              onToggleSelect={handleSelectScenario}
            />
          ))}
        </div>
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
                <h3 className="text-lg font-semibold">
                  {selectedRequirement}
                </h3>
                <div className="text-sm text-gray-600">
                  This dialog will show the complete requirement details including all business requirements,
                  business rules, and data elements associated with this requirement.
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
