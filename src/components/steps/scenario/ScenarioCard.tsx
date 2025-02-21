
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { ScenarioFlows } from "./ScenarioFlows";
import { CheckCircle, XCircle, AlertCircle, PlusCircle, Pencil, Trash2, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type TestScenario, type Priority, type ScenarioStatus } from "./types";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(scenario.title);
  const [editedDescription, setEditedDescription] = useState(scenario.description);
  const [editedPriority, setEditedPriority] = useState<Priority>(scenario.priority);
  const [editedStatus, setEditedStatus] = useState<ScenarioStatus>(scenario.status || "in_progress");

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

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateScenario({
      ...scenario,
      title: editedTitle,
      description: editedDescription,
      priority: editedPriority,
      status: editedStatus,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditedTitle(scenario.title);
    setEditedDescription(scenario.description);
    setEditedPriority(scenario.priority);
    setEditedStatus(scenario.status || "in_progress");
    setIsEditing(false);
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
        onClick={() => !isEditing && onScenarioClick(scenario.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) => onToggleSelect(scenario.id, checked as boolean)}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex-1">
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
                {isEditing ? (
                  <Select value={editedStatus} onValueChange={(value: ScenarioStatus) => setEditedStatus(value)}>
                    <SelectTrigger className="h-7 w-[130px]" onClick={(e) => e.stopPropagation()}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="needs_review">Needs Review</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="secondary">{scenario.status || 'in_progress'}</Badge>
                )}
              </div>
              {isEditing ? (
                <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="text-sm"
                  />
                  <Textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="text-sm min-h-[60px]"
                  />
                  <Select value={editedPriority} onValueChange={(value: Priority) => setEditedPriority(value)}>
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <p className="text-sm text-gray-600">{scenario.title}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleSaveEdit}
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleCancelEdit}
                >
                  <X className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleEditClick}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(e, scenario.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </>
            )}
          </div>
        </div>

        {!isEditing && suggestions.length > 0 && !isExpanded && (
          <div className="mt-2 flex items-center gap-1 text-amber-600">
            <AlertCircle className="h-4 w-4" />
            <span className="text-xs">
              {suggestions.length} coverage suggestions available
            </span>
          </div>
        )}

        {isExpanded && !isEditing && (
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
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAcceptSuggestion(suggestion.id);
                            }}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:text-red-600"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleRejectSuggestion(suggestion.id);
                            }}
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
