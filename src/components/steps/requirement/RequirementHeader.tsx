
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Edit, Save, X, ChevronDown, ChevronRight, Trash } from "lucide-react";
import { type Requirement } from "./types";
import { getStatusVariant } from "./requirementUtils";

interface RequirementHeaderProps {
  requirement: Requirement;
  isEditing: boolean;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleSelect: (checked: boolean) => void;
  onEdit: (e: React.MouseEvent) => void;
  onSave: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  onClick: () => void;
  onDelete: () => void;
  onFunctionalAreaChange: (value: string) => void;
  onSourceChange?: (field: 'page' | 'paragraph', value: number) => void;
  onStatusChange?: (status: "completed" | "needs_review" | "in_progress") => void;
}

export const RequirementHeader = ({
  requirement,
  isEditing,
  isExpanded,
  isSelected,
  onToggleSelect,
  onEdit,
  onSave,
  onCancel,
  onClick,
  onDelete,
  onFunctionalAreaChange,
  onSourceChange,
  onStatusChange,
}: RequirementHeaderProps) => {
  return (
    <CardHeader 
      className="py-3 cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggleSelect}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex items-center gap-2">
            <Badge variant="outline">{requirement.requirementId}</Badge>
            {isEditing ? (
              <Input
                value={requirement.functionalArea}
                onChange={(e) => onFunctionalAreaChange(e.target.value)}
                className="w-64"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <CardTitle className="text-lg">{requirement.functionalArea}</CardTitle>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="h-4 w-4" />
            {isEditing ? (
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <span className="text-xs">Page</span>
                <Input
                  type="number"
                  value={requirement.source.page}
                  onChange={(e) => onSourceChange?.('page', Number(e.target.value))}
                  className="w-16 h-7 text-xs"
                />
                <span className="text-xs">¶</span>
                <Input
                  type="number"
                  value={requirement.source.paragraph}
                  onChange={(e) => onSourceChange?.('paragraph', Number(e.target.value))}
                  className="w-16 h-7 text-xs"
                />
              </div>
            ) : (
              <span className="text-xs">
                Page {requirement.source.page}, ¶{requirement.source.paragraph}
              </span>
            )}
          </div>
          {isEditing ? (
            <div onClick={(e) => e.stopPropagation()}>
              <Select
                defaultValue={requirement.status}
                onValueChange={onStatusChange}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="needs_review">Needs Review</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <Badge variant={getStatusVariant(requirement.status)}>
              {requirement.status.replace("_", " ")}
            </Badge>
          )}
          {!isEditing && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(e);
              }}
              className="text-gray-500 hover:text-blue-500"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onCancel(e);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onSave(e);
                }}
              >
                <Save className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-gray-500 hover:text-red-500"
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      </div>
    </CardHeader>
  );
};
