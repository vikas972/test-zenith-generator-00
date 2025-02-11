
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Edit, Save, X, ChevronDown, ChevronRight } from "lucide-react";
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
  onFunctionalAreaChange: (value: string) => void;
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
  onFunctionalAreaChange,
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
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-gray-500">
            <MapPin className="h-4 w-4" />
            <span className="text-xs">
              Page {requirement.source.page}, ¶{requirement.source.paragraph}
            </span>
          </div>
          <Badge variant={getStatusVariant(requirement.status)}>
            {requirement.status.replace("_", " ")}
          </Badge>
          {isEditing ? (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={onCancel}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={onSave}
              >
                <Save className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4" />
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
