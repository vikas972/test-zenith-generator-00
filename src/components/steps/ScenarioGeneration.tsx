
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { type TestScenario } from "./scenario/types";
import { ScenarioCard } from "./scenario/ScenarioCard";
import { RequirementsCoverage } from "./scenario/RequirementsCoverage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
    toast({
      title: "Success",
      description: "Delete scenario"
    });
  };

  return (
    <div className="flex gap-4 h-full">
      <div className="w-2/3 flex flex-col">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Test Scenarios</h2>
          <Button onClick={handleAddScenario}>
            <Plus className="h-4 w-4 mr-2" />
            Add Scenario
          </Button>
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
