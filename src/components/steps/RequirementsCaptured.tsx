import { toast } from "sonner";
import { RequirementsSection } from "./requirement/components/RequirementsSection";
import { SourceViewer } from "./requirement/components/SourceViewer";
import { useRequirements } from "./requirement/hooks/useRequirements";
import { useRequirementsLayout } from "./requirement/hooks/useRequirementsLayout";
import { createNewRequirement } from "./requirement/requirementUtils";
import { type Requirement } from "./requirement/types";

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
    description: "The system shall provide secure authentication mechanisms",
    actors: ["End User", "System"],
    flows: [
      { 
        id: "f1", 
        description: "User enters credentials",
        type: "primary",
        steps: [
          {
            id: "s1",
            description: "User enters username and password",
            expectedOutcome: "Credentials are submitted"
          }
        ]
      }
    ],
    businessRules: [
      { 
        id: "br1", 
        description: "Password must be at least 8 characters",
        category: "authentication"
      }
    ],
    dataElements: [
      { id: "de1", name: "Username", type: "string", required: true }
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
    flows: [
      { 
        id: "f2", 
        description: "User requests password reset",
        type: "primary",
        steps: [
          {
            id: "s2",
            description: "User clicks forgot password",
            expectedOutcome: "Reset email is sent"
          }
        ]
      }
    ],
    businessRules: [
      { 
        id: "br2", 
        description: "Reset link expires in 24 hours",
        category: "security"
      }
    ],
    dataElements: [
      { id: "de2", name: "Email", type: "string", required: true }
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
    flows: [
      { 
        id: "f3", 
        description: "Update profile information",
        type: "primary",
        steps: [
          {
            id: "s3",
            description: "User edits profile fields",
            expectedOutcome: "Profile is updated"
          }
        ]
      }
    ],
    businessRules: [
      { 
        id: "br3", 
        description: "Email changes require verification",
        category: "system"
      }
    ],
    dataElements: [
      { id: "de3", name: "DisplayName", type: "string", required: false }
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
      />

      <SourceViewer
        content={sourceContent}
        isMaximized={isSourceMaximized}
        isHidden={isRequirementsMaximized}
        onToggleMaximize={toggleSourceMaximize}
      />
    </div>
  );
};
