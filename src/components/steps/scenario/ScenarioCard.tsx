
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type TestScenario, type TestScenarioFlow, type FlowType } from "./types";
import { ScenarioFlows } from "./ScenarioFlows";

interface ScenarioCardProps {
  scenario: TestScenario;
  isSelected: boolean;
  isExpanded: boolean;
  onScenarioClick: (id: string) => void;
  onRequirementClick: (id: string) => void;
  onEdit: (e: React.MouseEvent, id: string) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
  onUpdateScenario: (updatedScenario: TestScenario) => void;
}

export const ScenarioCard = ({
  scenario,
  isSelected,
  isExpanded,
  onScenarioClick,
  onRequirementClick,
  onEdit,
  onDelete,
  onUpdateScenario,
}: ScenarioCardProps) => {
  const handleUpdateFlows = (updatedFlows: TestScenarioFlow[]) => {
    onUpdateScenario({
      ...scenario,
      flows: updatedFlows,
    });
  };

  return (
    <Card
      className={cn(
        "cursor-pointer transition-colors",
        isSelected && "border-primary"
      )}
      onClick={() => onScenarioClick(scenario.id)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <div>
              <div className="font-medium">
                📋 {scenario.title}
              </div>
              <div className="text-sm text-gray-500">
                ID: {scenario.id} | Priority: {scenario.priority} | Requirement:{" "}
                <button 
                  className="text-primary hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRequirementClick(scenario.requirementId);
                  }}
                >
                  {scenario.requirementId}
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => onEdit(e, scenario.id)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => onDelete(e, scenario.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>

        {isExpanded && <ScenarioFlows flows={scenario.flows} onUpdateFlows={handleUpdateFlows} />}
      </div>
    </Card>
  );
};
