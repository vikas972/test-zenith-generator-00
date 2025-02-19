
import { Card } from "@/components/ui/card";
import { RequirementHeader } from "./RequirementHeader";
import { RequirementContent } from "./RequirementContent";
import { type Requirement } from "./types";
import { cn } from "@/lib/utils";

interface RequirementCardProps {
  requirement: Requirement;
  isExpanded: boolean;
  isEditing: boolean;
  isSelected: boolean;
  onToggleSelect: (checked: boolean) => void;
  onEdit: (e: React.MouseEvent) => void;
  onSave: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  onClick: () => void;
  onDelete: () => void;
  onFunctionalAreaChange: (value: string) => void;
  onSourceChange: (field: 'page' | 'paragraph', value: number) => void;
  onStatusChange: (status: "completed" | "needs_review" | "in_progress") => void;
}

export const RequirementCard = ({
  requirement,
  isExpanded,
  isEditing,
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
}: RequirementCardProps) => {
  const handleUpdateFlows = (flows: Requirement['flows']) => {
    const updatedRequirement = { ...requirement, flows };
    // Using onFunctionalAreaChange to trigger a re-render in the parent
    onFunctionalAreaChange(updatedRequirement.functionalArea);
  };

  const handleUpdateBusinessRules = (rules: Requirement['businessRules']) => {
    const updatedRequirement = { ...requirement, businessRules: rules };
    // Using onFunctionalAreaChange to trigger a re-render in the parent
    onFunctionalAreaChange(updatedRequirement.functionalArea);
  };

  const handleUpdateDataElements = (elements: Requirement['dataElements']) => {
    const updatedRequirement = { ...requirement, dataElements: elements };
    // Using onFunctionalAreaChange to trigger a re-render in the parent
    onFunctionalAreaChange(updatedRequirement.functionalArea);
  };

  return (
    <Card className={cn(
      "mb-4 relative",
      isExpanded && "border-primary"
    )}>
      <RequirementHeader
        requirement={requirement}
        isEditing={isEditing}
        isExpanded={isExpanded}
        isSelected={isSelected}
        onToggleSelect={onToggleSelect}
        onEdit={onEdit}
        onSave={onSave}
        onCancel={onCancel}
        onClick={onClick}
        onDelete={onDelete}
        onFunctionalAreaChange={onFunctionalAreaChange}
        onSourceChange={onSourceChange}
        onStatusChange={onStatusChange}
      />
      {isExpanded && (
        <RequirementContent
          requirement={requirement}
          onUpdateFlows={handleUpdateFlows}
          onUpdateBusinessRules={handleUpdateBusinessRules}
          onUpdateDataElements={handleUpdateDataElements}
        />
      )}
    </Card>
  );
};
