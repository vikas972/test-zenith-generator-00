
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ScenarioFlows } from "./ScenarioFlows";
import { CheckCircle, XCircle, AlertCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { type TestScenario } from "./types";
import { useState } from "react";

interface ScenarioCardProps {
  scenario: TestScenario;
  isSelected: boolean;
  isExpanded: boolean;
  onScenarioClick: (id: string) => void;
  onRequirementClick: (requirementId: string) => void;
  onEdit: (e: React.MouseEvent, id: string) => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
  onUpdateScenario: (updatedScenario: TestScenario) => void;
  isChecked: boolean;
  onToggleSelect: (id: string, checked: boolean) => void;
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
  isChecked,
  onToggleSelect,
}: ScenarioCardProps) => {
  const [suggestions] = useState([
    {
      id: 1,
      description: "Add validation for empty input fields",
      type: "validation"
    },
    {
      id: 2,
      description: "Include error handling for network timeout",
      type: "error_handling"
    }
  ]);

  const [acceptedSuggestions, setAcceptedSuggestions] = useState<number[]>([]);
  const [rejectedSuggestions, setRejectedSuggestions] = useState<number[]>([]);

  const handleAcceptSuggestion = (suggestionId: number) => {
    setAcceptedSuggestions(prev => [...prev, suggestionId]);
  };

  const handleRejectSuggestion = (suggestionId: number) => {
    setRejectedSuggestions(prev => [...prev, suggestionId]);
  };

  const handleUpdateFlows = (newFlows: TestScenario["flows"]) => {
    onUpdateScenario({
      ...scenario,
      flows: newFlows,
    });
  };

  return (
    <Card
      className={cn(
        "transition-all",
        isSelected && "ring-2 ring-primary",
        isExpanded && "mb-4"
      )}
    >
      <div
        className="p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => onScenarioClick(scenario.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) => onToggleSelect(scenario.id, checked as boolean)}
              onClick={(e) => e.stopPropagation()}
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{scenario.id}</span>
                <Badge
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/5"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRequirementClick(scenario.requirementId);
                  }}
                >
                  {scenario.requirementId}
                </Badge>
                <Badge>{scenario.status}</Badge>
              </div>
              <p className="text-sm text-gray-600">{scenario.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => onEdit(e, scenario.id)}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => onDelete(e, scenario.id)}
            >
              Delete
            </Button>
          </div>
        </div>

        {suggestions.length > 0 && !isExpanded && (
          <div className="mt-2 flex items-center gap-1 text-amber-600">
            <AlertCircle className="h-4 w-4" />
            <span className="text-xs">
              {suggestions.length} coverage suggestions available
            </span>
          </div>
        )}

        {isExpanded && (
          <>
            <ScenarioFlows
              flows={scenario.flows}
              onUpdateFlows={handleUpdateFlows}
            />

            {suggestions
              .filter(s => !acceptedSuggestions.includes(s.id) && !rejectedSuggestions.includes(s.id))
              .length > 0 && (
              <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <PlusCircle className="h-4 w-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-700">
                    Coverage Suggestions
                  </span>
                </div>
                <div className="space-y-2">
                  {suggestions
                    .filter(s => !acceptedSuggestions.includes(s.id) && !rejectedSuggestions.includes(s.id))
                    .map(suggestion => (
                      <div
                        key={suggestion.id}
                        className="flex items-start justify-between gap-4 text-sm"
                      >
                        <span className="text-amber-700">{suggestion.description}</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:text-green-600"
                            onClick={() => handleAcceptSuggestion(suggestion.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:text-red-600"
                            onClick={() => handleRejectSuggestion(suggestion.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Card>
  );
};
