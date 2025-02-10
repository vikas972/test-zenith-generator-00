
import { type Requirement } from "./types";

interface RequirementBusinessRulesProps {
  requirement: Requirement;
  editingRequirement: Requirement | null;
  setEditingRequirement: (requirement: Requirement | null) => void;
}

export const RequirementBusinessRules = ({
  requirement,
  editingRequirement,
  setEditingRequirement,
}: RequirementBusinessRulesProps) => {
  const isEditing = editingRequirement?.id === requirement.id;

  return (
    <div className="space-y-2">
      {requirement.businessRules.map((rule, index) => (
        <div key={index} className="text-sm">
          {rule}
        </div>
      ))}
    </div>
  );
};
