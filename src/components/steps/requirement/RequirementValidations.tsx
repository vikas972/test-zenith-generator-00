
import { type Requirement } from "./types";

interface RequirementValidationsProps {
  requirement: Requirement;
  editingRequirement: Requirement | null;
  setEditingRequirement: (requirement: Requirement | null) => void;
}

export const RequirementValidations = ({
  requirement,
  editingRequirement,
  setEditingRequirement,
}: RequirementValidationsProps) => {
  const isEditing = editingRequirement?.id === requirement.id;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Validations</h4>
        {requirement.validations.map((validation, index) => (
          <div key={index} className="text-sm">
            {validation}
          </div>
        ))}
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Data Elements</h4>
        {requirement.dataElements.map((element, index) => (
          <div key={index} className="text-sm flex items-center gap-2">
            <span className="font-medium">{element.name}</span>
            <span className="text-gray-500">({element.type})</span>
            {element.required && (
              <span className="text-xs text-red-500">Required</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
