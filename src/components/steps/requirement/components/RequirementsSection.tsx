
import { cn } from "@/lib/utils";
import { type Requirement } from "../types";
import { RequirementsHeader } from "./RequirementsHeader";
import { RequirementsList } from "./RequirementsList";

interface RequirementsSectionProps {
  fileName: string | undefined;
  isMaximized: boolean;
  requirements: Requirement[];
  editingRequirement: string | null;
  selectedRequirements: string[];
  expandedRequirement: string | null;
  onSelectAll: (checked: boolean) => void;
  onAddNew: () => void;
  onRegenerate: () => void;
  onBulkStatusChange: (status: "completed" | "needs_review" | "in_progress") => void;
  onBulkDelete: () => void;
  onToggleMaximize: () => void;
  onSelect: (requirementId: string, checked: boolean) => void;
  onEdit: (requirement: Requirement, e: React.MouseEvent) => void;
  onSave: (e: React.MouseEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  onClick: (requirement: Requirement) => void;
  onDelete: (requirementId: string) => void;
  onFunctionalAreaChange: (requirementId: string, value: string) => void;
  onSourceChange: (requirementId: string, field: 'page' | 'paragraph', value: number) => void;
  onStatusChange: (requirementId: string, status: "completed" | "needs_review" | "in_progress") => void;
  isSourceMaximized: boolean;
  onShowGrid: () => void; // Added new prop
}

export const RequirementsSection = ({
  fileName,
  isMaximized,
  requirements,
  editingRequirement,
  selectedRequirements,
  expandedRequirement,
  onSelectAll,
  onAddNew,
  onRegenerate,
  onBulkStatusChange,
  onBulkDelete,
  onToggleMaximize,
  onSelect,
  onEdit,
  onSave,
  onCancel,
  onClick,
  onDelete,
  onFunctionalAreaChange,
  onSourceChange,
  onStatusChange,
  isSourceMaximized,
  onShowGrid, // Added new prop
}: RequirementsSectionProps) => {
  return (
    <div className={cn(
      "flex flex-col h-full transition-all duration-300",
      isMaximized ? "w-full" : "flex-1",
      isSourceMaximized ? "hidden" : "flex"
    )}>
      <RequirementsHeader
        fileName={fileName}
        isMaximized={isMaximized}
        selectedCount={selectedRequirements.length}
        totalCount={requirements.length}
        onSelectAll={onSelectAll}
        onAddNew={onAddNew}
        onRegenerate={onRegenerate}
        onBulkStatusChange={onBulkStatusChange}
        onDelete={onBulkDelete}
        onToggleMaximize={onToggleMaximize}
        onShowGrid={onShowGrid} // Pass the new prop
      />

      <div className="flex-1 overflow-auto px-6 py-4">
        <RequirementsList
          requirements={requirements}
          editingRequirement={editingRequirement}
          selectedRequirements={selectedRequirements}
          expandedRequirement={expandedRequirement}
          onSelect={onSelect}
          onEdit={onEdit}
          onSave={onSave}
          onCancel={onCancel}
          onClick={onClick}
          onDelete={onDelete}
          onFunctionalAreaChange={onFunctionalAreaChange}
          onSourceChange={onSourceChange}
          onStatusChange={onStatusChange}
        />
      </div>
    </div>
  );
};
