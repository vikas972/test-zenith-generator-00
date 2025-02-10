
import { type Requirement } from "./types";

interface RequirementFlowsProps {
  requirement: Requirement;
  editingRequirement: Requirement | null;
  setEditingRequirement: (requirement: Requirement | null) => void;
}

export const RequirementFlows = ({
  requirement,
  editingRequirement,
  setEditingRequirement,
}: RequirementFlowsProps) => {
  const isEditing = editingRequirement?.id === requirement.id;

  return (
    <div className="space-y-2">
      {requirement.flows.map((flow, index) => (
        <div key={index} className="text-sm">
          {flow}
        </div>
      ))}
    </div>
  );
};
