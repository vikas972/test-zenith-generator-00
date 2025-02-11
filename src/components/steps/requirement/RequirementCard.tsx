
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
  onFunctionalAreaChange: (value: string) => void;
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
  onFunctionalAreaChange,
}: RequirementCardProps) => {
  return (
    <Card className={cn(
      "mb-4",
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
        onFunctionalAreaChange={onFunctionalAreaChange}
      />
      {isExpanded && <RequirementContent requirement={requirement} />}
    </Card>
  );
};
