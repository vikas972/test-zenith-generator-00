
import { toast } from "sonner";
import { RequirementsSection } from "./requirement/components/RequirementsSection";
import { SourceViewer } from "./requirement/components/SourceViewer";
import { useRequirements } from "./requirement/hooks/useRequirements";
import { useRequirementsLayout } from "./requirement/hooks/useRequirementsLayout";
import { createNewRequirement } from "./requirement/requirementUtils";
import { type Requirement } from "./requirement/types";
import { RequirementGridDialog } from "./requirement/dialogs/RequirementGridDialog";
import { useState } from "react";

interface RequirementsCapturedProps {
  selectedFile: {
    id: string;
    name: string;
    uploadTime: Date;
  } | null;
}

const initialRequirements: Requirement[] = [
  {
    id: "1",
    requirementId: "REQ-001",
    functionalArea: "User Authentication",
    description: "System shall provide secure user authentication mechanisms",
    actors: ["End User", "System"],
    businessRequirements: [
      { id: "br1", description: "System shall authenticate users" },
      { id: "br2", description: "System shall validate credentials" },
      { id: "br3", description: "System shall manage sessions" }
    ],
    businessRules: [
      { id: "rule1", description: "Password must be at least 8 characters", category: "security" },
      { id: "rule2", description: "Account locks after 3 failed attempts", category: "security" },
      { id: "rule3", description: "Session expires after 30 minutes", category: "security" }
    ],
    dataElements: [
      { id: "de1", name: "Username", type: "string", required: true, specifications: ["Must be email format"] },
      { id: "de2", name: "Password", type: "string", required: true, specifications: ["Min 8 characters", "1 special character"] }
    ],
    integrationPoints: [],
    expectedBehaviors: [],
    missingInfo: [],
    status: "needs_review" as const,
    confidence: 0.85,
    source: {
      paragraph: 2,
      page: 1,
      text: "The system shall provide secure user authentication mechanisms.",
      startIndex: 50,
      endIndex: 150
    }
  },
  {
    id: "2",
    requirementId: "REQ-002",
    functionalArea: "Password Reset",
    description: "Users should be able to reset their passwords securely",
    actors: ["End User", "System"],
    businessRequirements: [
      { id: "br4", description: "System shall allow users to request password reset" },
      { id: "br5", description: "System shall send a reset link to the user's email" },
    ],
    businessRules: [
      { id: "rule4", description: "Reset link expires in 24 hours", category: "security" },
    ],
    dataElements: [
      { id: "de3", name: "Email", type: "string", required: true, specifications: ["Must be a valid email format"] },
    ],
    integrationPoints: [],
    expectedBehaviors: [],
    missingInfo: [],
    status: "in_progress" as const,
    confidence: 0.9,
    source: {
      paragraph: 3,
      page: 1,
      text: "Users must be able to reset their passwords through a secure process.",
      startIndex: 160,
      endIndex: 220
    }
  },
  {
    id: "3",
    requirementId: "REQ-003",
    functionalArea: "Profile Management",
    description: "Users should be able to manage their profile information",
    actors: ["End User"],
    businessRequirements: [
      { id: "br6", description: "System shall allow users to update their profile information" },
    ],
    businessRules: [
      { id: "rule5", description: "Email changes require verification", category: "system" },
    ],
    dataElements: [
      { id: "de4", name: "DisplayName", type: "string", required: false },
    ],
    integrationPoints: [],
    expectedBehaviors: [],
    missingInfo: [],
    status: "completed" as const,
    confidence: 0.95,
    source: {
      paragraph: 4,
      page: 1,
      text: "The system must allow users to manage their profile details.",
      startIndex: 230,
      endIndex: 280
    }
  }
];

export const RequirementsCaptured = ({ selectedFile }: RequirementsCapturedProps) => {
  const {
    requirements,
    editingRequirement,
    selectedRequirements,
    expandedRequirement,
    handleSelectRequirement,
    handleSelectAll,
    handleEditRequirement,
    handleSaveRequirement,
    handleCancelEdit,
    handleDeleteRequirement,
    handleBulkDelete,
    handleBulkStatusChange,
    handleStatusChange,
    handleRequirementClick,
    handleFunctionalAreaChange,
    handleSourceChange,
  } = useRequirements(initialRequirements);

  const {
    isRequirementsMaximized,
    isSourceMaximized,
    toggleRequirementsMaximize,
    toggleSourceMaximize,
  } = useRequirementsLayout();

  const [showGridDialog, setShowGridDialog] = useState(false);

  const sourceContent = requirements
    .map(req => {
      if (req.id === expandedRequirement) {
        return `<mark class="bg-yellow-200">${req.source.text}</mark>`;
      }
      return req.source.text;
    })
    .join("\n\n");

  const handleAddNewRequirement = () => {
    const newRequirement = createNewRequirement(requirements.length);
    toast.success("New requirement added");
  };

  const handleRegenerateSelected = () => {
    if (selectedRequirements.length === 0) {
      toast.error("Please select at least one requirement to regenerate");
      return;
    }
    toast.success(`Regenerating ${selectedRequirements.length} requirements`);
  };

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <RequirementsSection
        fileName={selectedFile?.name}
        isMaximized={isRequirementsMaximized}
        requirements={requirements}
        editingRequirement={editingRequirement}
        selectedRequirements={selectedRequirements}
        expandedRequirement={expandedRequirement}
        onSelectAll={handleSelectAll}
        onAddNew={handleAddNewRequirement}
        onRegenerate={handleRegenerateSelected}
        onBulkStatusChange={handleBulkStatusChange}
        onBulkDelete={handleBulkDelete}
        onToggleMaximize={toggleRequirementsMaximize}
        onSelect={handleSelectRequirement}
        onEdit={handleEditRequirement}
        onSave={handleSaveRequirement}
        onCancel={handleCancelEdit}
        onClick={handleRequirementClick}
        onDelete={handleDeleteRequirement}
        onFunctionalAreaChange={handleFunctionalAreaChange}
        onSourceChange={handleSourceChange}
        onStatusChange={handleStatusChange}
        isSourceMaximized={isSourceMaximized}
        onShowGrid={() => setShowGridDialog(true)}
      />

      <SourceViewer
        content={sourceContent}
        isMaximized={isSourceMaximized}
        isHidden={isRequirementsMaximized}
        onToggleMaximize={toggleSourceMaximize}
      />

      <RequirementGridDialog
        open={showGridDialog}
        onOpenChange={setShowGridDialog}
        requirements={requirements}
      />
    </div>
  );
};
