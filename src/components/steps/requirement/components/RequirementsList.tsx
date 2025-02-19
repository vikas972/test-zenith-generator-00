
import { RequirementCard } from "../RequirementCard";
import { type Requirement } from "../types";

interface RequirementsListProps {
  requirements: Requirement[];
  editingRequirement: string | null;
  selectedRequirements: string[];
  expandedRequirement: string | null;
  onSelect: (requirementId: string, checked: boolean) => void;
  onEdit: (requirement: Requirement, e: React.MouseEvent) => void;
  onSave: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  onClick: (requirement: Requirement) => void;
  onDelete: (requirementId: string) => void;
  onFunctionalAreaChange: (requirementId: string, value: string) => void;
  onSourceChange: (requirementId: string, field: 'page' | 'paragraph', value: number) => void;
  onStatusChange: (requirementId: string, status: "completed" | "needs_review" | "in_progress") => void;
}

export const RequirementsList = ({
  requirements,
  editingRequirement,
  selectedRequirements,
  expandedRequirement,
  onSelect,
  onEdit,
  onSave,
  onCancel,
  onClick,
  onDelete,
  onFunctionalAreaChange,
  onSourceChange,
  onStatusChange,
}: RequirementsListProps) => {
  return (
    <div className="flex-1 overflow-auto">
      {requirements.map((req) => (
        <RequirementCard
          key={req.id}
          requirement={req}
          isExpanded={expandedRequirement === req.id}
          isEditing={editingRequirement === req.id}
          isSelected={selectedRequirements.includes(req.id)}
          onToggleSelect={(checked) => onSelect(req.id, checked)}
          onEdit={(e) => onEdit(req, e)}
          onSave={onSave}
          onCancel={onCancel}
          onClick={() => onClick(req)}
          onDelete={() => onDelete(req.id)}
          onFunctionalAreaChange={(value) => onFunctionalAreaChange(req.id, value)}
          onSourceChange={(field, value) => onSourceChange(req.id, field, value)}
          onStatusChange={(status) => onStatusChange(req.id, status)}
        />
      ))}
    </div>
  );
};
