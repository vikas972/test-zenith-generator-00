
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Edit2, Trash2, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type TestScenario, type TestScenarioFlow, type Priority, type ScenarioStatus } from "./types";
import { ScenarioFlows } from "./ScenarioFlows";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface ScenarioCardProps {
  scenario: TestScenario;
  isSelected: boolean;
  isExpanded: boolean;
  onScenarioClick: (id: string) => void;
  onRequirementClick: (id: string) => void;
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
  const [editedPriority, setEditedPriority] = useState<Priority>(scenario.priority);
  const [editedStatus, setEditedStatus] = useState<ScenarioStatus>(scenario.status || "in_progress");

  const handleUpdateFlows = (updatedFlows: TestScenarioFlow[]) => {
    onUpdateScenario({
      ...scenario,
      flows: updatedFlows,
    });
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateScenario({
      ...scenario,
      title: editedTitle,
      priority: editedPriority,
      status: editedStatus,
    });
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditedTitle(scenario.title);
    setEditedPriority(scenario.priority);
    setEditedStatus(scenario.status || "in_progress");
    setIsEditing(false);
  };

  const handleStatusChange = (value: ScenarioStatus) => {
    setEditedStatus(value);
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "completed":
        return "default";
      case "in_progress":
        return "secondary";
      case "needs_review":
        return "outline";
      default:
        return "outline";
    }
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
            <Checkbox
              checked={isChecked}
              onCheckedChange={(checked) => {
                onToggleSelect(scenario.id, checked as boolean);
              }}
              onClick={(e) => e.stopPropagation()}
            />
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <div>
              {isEditing ? (
                <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <Input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-[300px]"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={editedPriority}
                      onValueChange={(value: Priority) => setEditedPriority(value)}
                    >
                      <SelectTrigger 
                        className="w-[100px]" 
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent onClick={(e) => e.stopPropagation()}>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={editedStatus}
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger 
                        className="w-[120px]" 
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent onClick={(e) => e.stopPropagation()}>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="needs_review">Needs Review</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSave}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancel}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-muted px-2 py-0.5 rounded-md text-sm font-semibold text-muted-foreground">
                      {scenario.id}
                    </span>
                    <span className="font-medium">
                      {scenario.title}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="font-medium">Priority:</span> 
                    <span className="capitalize">{scenario.priority}</span>
                    <span className="font-medium">Status:</span>
                    <Badge variant={getStatusVariant(scenario.status || "in_progress")}>
                      {(scenario.status || "in_progress").replace("_", " ")}
                    </Badge>
                    <span className="font-medium">Requirement:</span>
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
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEditClick}
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
              </>
            )}
          </div>
        </div>

        {isExpanded && <ScenarioFlows flows={scenario.flows} onUpdateFlows={handleUpdateFlows} />}
      </div>
    </Card>
  );
};
