import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { RequirementCard } from "./requirement/RequirementCard";
import { type Requirement } from "./requirement/types";
import { createNewRequirement } from "./requirement/requirementUtils";

interface RequirementsCapturedProps {
  selectedFile: {
    id: string;
    name: string;
    uploadTime: Date;
  } | null;
}

export const RequirementsCaptured = ({ selectedFile }: RequirementsCapturedProps) => {
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: "1",
      requirementId: "REQ-001",
      functionalArea: "User Authentication",
      description: "The system shall provide secure authentication mechanisms",
      actors: ["End User", "System"],
      flows: [
        { id: "f1", description: "User enters credentials" },
        { id: "f2", description: "System validates credentials" },
      ],
      businessRules: [
        { id: "br1", description: "Password must be at least 8 characters" },
        { id: "br2", description: "Account locks after 3 failed attempts" },
      ],
      dataElements: [
        { id: "de1", name: "Username", type: "string", required: true },
        { id: "de2", name: "Password", type: "string", required: true },
      ],
      missingInfo: ["Password reset flow", "2FA requirements"],
      status: "needs_review",
      confidence: 0.85,
      source: {
        paragraph: 2,
        page: 1,
        text: "The system shall provide secure user authentication mechanisms including password validation and account lockout policies.",
        startIndex: 50,
        endIndex: 150
      }
    },
    {
      id: "2",
      requirementId: "REQ-002",
      functionalArea: "User Management",
      description: "Administrators shall be able to manage user accounts",
      actors: ["Admin", "System"],
      flows: [
        { id: "f3", description: "Admin creates new user account" },
        { id: "f4", description: "Admin modifies user permissions" },
      ],
      businessRules: [
        { id: "br3", description: "Only admins can modify user roles" },
        { id: "br4", description: "User email must be unique" },
      ],
      dataElements: [
        { id: "de3", name: "Email", type: "string", required: true },
        { id: "de4", name: "Role", type: "enum", required: true },
      ],
      missingInfo: ["Role hierarchy definition", "Permission matrix"],
      status: "in_progress",
      confidence: 0.75,
      source: {
        paragraph: 3,
        page: 1,
        text: "Administrators shall have the ability to create, modify, and delete user accounts with appropriate access controls.",
        startIndex: 200,
        endIndex: 300
      }
    },
    {
      id: "3",
      requirementId: "REQ-003",
      functionalArea: "Password Recovery",
      description: "System shall provide password recovery mechanism",
      actors: ["User", "System", "Email Service"],
      flows: [
        { id: "f5", description: "User requests password reset" },
        { id: "f6", description: "System sends recovery email" },
      ],
      businessRules: [
        { id: "br5", description: "Reset links expire after 24 hours" },
        { id: "br6", description: "New password must be different from last 3" },
      ],
      dataElements: [
        { id: "de5", name: "ResetToken", type: "string", required: true },
        { id: "de6", name: "ExpiryTime", type: "datetime", required: true },
      ],
      missingInfo: ["Rate limiting rules", "Recovery email template"],
      status: "completed",
      confidence: 0.95,
      source: {
        paragraph: 4,
        page: 2,
        text: "The system must implement a secure password recovery mechanism with time-limited reset tokens.",
        startIndex: 350,
        endIndex: 450
      }
    },
    {
      id: "4",
      requirementId: "REQ-004",
      functionalArea: "Session Management",
      description: "System shall manage user sessions securely",
      actors: ["User", "System"],
      flows: [
        { id: "f7", description: "System creates session on login" },
        { id: "f8", description: "System invalidates session on logout" },
      ],
      businessRules: [
        { id: "br7", description: "Sessions expire after 30 minutes of inactivity" },
        { id: "br8", description: "Maximum 5 concurrent sessions per user" },
      ],
      dataElements: [
        { id: "de7", name: "SessionID", type: "string", required: true },
        { id: "de8", name: "LastActivity", type: "timestamp", required: true },
      ],
      missingInfo: ["Session revival mechanism", "Multi-device handling"],
      status: "needs_review",
      confidence: 0.80,
      source: {
        paragraph: 5,
        page: 2,
        text: "User sessions must be managed securely with proper timeout and concurrent session controls.",
        startIndex: 500,
        endIndex: 600
      }
    }
  ]);

  const [expandedRequirement, setExpandedRequirement] = useState<string | null>(null);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [sourceContent, setSourceContent] = useState<string>(`
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    
    REQ-001: User Authentication
    The system shall provide secure user authentication mechanisms including password validation and account lockout policies.
    
    REQ-002: User Management
    Administrators shall be able to create, modify, and delete user accounts with appropriate access controls.
  `);

  const handleRequirementClick = (requirement: Requirement) => {
    setExpandedRequirement(expandedRequirement === requirement.id ? null : requirement.id);
    
    const sourceElement = document.getElementById('source-content');
    if (sourceElement) {
      const text = sourceElement.innerHTML;
      const highlightedText = text.slice(0, requirement.source.startIndex) +
        `<mark class="bg-yellow-100">${text.slice(requirement.source.startIndex, requirement.source.endIndex)}</mark>` +
        text.slice(requirement.source.endIndex);
      sourceElement.innerHTML = highlightedText;
    }
  };

  const handleAddNewRequirement = () => {
    const newRequirement = createNewRequirement(requirements.length);
    setRequirements([...requirements, newRequirement]);
    setExpandedRequirement(newRequirement.id);
    setEditingRequirement(newRequirement.id);
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
      <div className="flex-1 flex flex-col h-full">
        <div className="px-6 py-6 bg-white border-b">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Requirements Captured
              </h1>
              <p className="text-gray-500">
                Review and edit captured requirements from{" "}
                {selectedFile ? selectedFile.name : "the uploaded document"}
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddNewRequirement}>
                <Plus className="h-4 w-4 mr-2" />
                Add Requirement
              </Button>
              <Button 
                onClick={handleRegenerateSelected}
                disabled={selectedRequirements.length === 0}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate Selected
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-6 py-4">
          <div className="space-y-4">
            {requirements.map((requirement) => (
              <RequirementCard
                key={requirement.id}
                requirement={requirement}
                isExpanded={expandedRequirement === requirement.id}
                isEditing={editingRequirement === requirement.id}
                isSelected={selectedRequirements.includes(requirement.id)}
                onToggleSelect={(checked) => {
                  setSelectedRequirements(prev =>
                    checked
                      ? [...prev, requirement.id]
                      : prev.filter(id => id !== requirement.id)
                  );
                }}
                onEdit={(e) => {
                  e.stopPropagation();
                  setEditingRequirement(requirement.id);
                }}
                onSave={(e) => {
                  e.stopPropagation();
                  setEditingRequirement(null);
                  toast.success("Changes saved successfully");
                }}
                onCancel={(e) => {
                  e.stopPropagation();
                  setEditingRequirement(null);
                }}
                onClick={() => handleRequirementClick(requirement)}
                onFunctionalAreaChange={(value) =>
                  setRequirements((prevReqs) =>
                    prevReqs.map((r) =>
                      r.id === requirement.id
                        ? { ...r, functionalArea: value }
                        : r
                    )
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-1/3 border-l flex flex-col bg-gray-50">
        <div className="p-4 border-b bg-white">
          <h2 className="text-lg font-semibold">Source Document</h2>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <div
            id="source-content"
            className="prose prose-sm max-w-none whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: sourceContent }}
          />
        </div>
      </div>
    </div>
  );
};
