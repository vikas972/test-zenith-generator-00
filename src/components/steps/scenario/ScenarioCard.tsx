
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Edit2, Trash2, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type TestScenario, type TestScenarioFlow, type Priority } from "./types";
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
  const [editedStatus, setEditedStatus] = useState(scenario.status || "draft");

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
    setEditedStatus(scenario.status || "draft");
    setIsEditing(false);
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "approved":
        return "default";
      case "in_review":
        return "secondary";
      case "rejected":
        return "destructive";
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
                      onValueChange={setEditedStatus}
                    >
                      <SelectTrigger 
                        className="w-[120px]" 
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent onClick={(e) => e.stopPropagation()}>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="in_review">In Review</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
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
                  <div className="font-medium">
                    📋 {scenario.title}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span>ID: {scenario.id}</span>
                    <span>Priority: {scenario.priority}</span>
                    <Badge variant={getStatusVariant(scenario.status || "draft")}>
                      {(scenario.status || "draft").replace("_", " ")}
                    </Badge>
                    <span>
                      Requirement:{" "}
                      <button 
                        className="text-primary hover:underline"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRequirementClick(scenario.requirementId);
                        }}
                      >
                        {scenario.requirementId}
                      </button>
                    </span>
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
