import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, RefreshCw, Maximize2, Minimize2, Trash2, CheckSquare } from "lucide-react";
import { RequirementCard } from "./requirement/RequirementCard";
import { type Requirement } from "./requirement/types";
import { createNewRequirement } from "./requirement/requirementUtils";
import { cn } from "@/lib/utils";

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
        { 
          id: "f1", 
          description: "User enters credentials",
          type: "primary",
          steps: [
            {
              id: "s1",
              description: "User inputs username and password",
              expectedOutcome: "Input fields are validated"
            }
          ]
        },
        { 
          id: "f2", 
          description: "System validates credentials",
          type: "primary",
          steps: [
            {
              id: "s2",
              description: "System checks credentials against database",
              expectedOutcome: "Credentials are verified"
            }
          ]
        }
      ],
      businessRules: [
        { 
          id: "br1", 
          description: "Password must be at least 8 characters",
          category: "authentication",
          validationCriteria: "Length >= 8"
        },
        { 
          id: "br2", 
          description: "Account locks after 3 failed attempts",
          category: "security",
          validationCriteria: "Count failed attempts"
        }
      ],
      dataElements: [
        { 
          id: "de1", 
          name: "Username", 
          type: "string", 
          required: true,
          format: "email",
          validationRules: ["Valid email format"]
        },
        { 
          id: "de2", 
          name: "Password", 
          type: "string", 
          required: true,
          validationRules: ["Min 8 chars"]
        }
      ],
      integrationPoints: [
        {
          id: "ip1",
          system: "Email Service",
          type: "REST API",
          expectedBehavior: "Send verification emails"
        }
      ],
      expectedBehaviors: [
        {
          id: "eb1",
          type: "success",
          condition: "Valid credentials",
          response: "User logged in"
        }
      ],
      missingInfo: [
        { 
          id: "mi1", 
          category: "flows", 
          description: "Password reset flow" 
        },
        { 
          id: "mi2", 
          category: "business_rules", 
          description: "2FA requirements" 
        }
      ],
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
      missingInfo: [
        { id: "mi3", category: "flows", description: "Role hierarchy definition" },
        { id: "mi4", category: "business_rules", description: "Permission matrix" }
      ],
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
      missingInfo: [
        { id: "mi5", category: "flows", description: "Rate limiting rules" },
        { id: "mi6", category: "business_rules", description: "Recovery email template" }
      ],
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
      missingInfo: [
        { id: "mi7", category: "flows", description: "Session revival mechanism" },
        { id: "mi8", category: "business_rules", description: "Multi-device handling" }
      ],
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
  const [editingRequirement, setEditingRequirement] = useState<string | null>(null);
  const [sourceContent, setSourceContent] = useState<string>(`
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    
    REQ-001: User Authentication
    The system shall provide secure user authentication mechanisms including password validation and account lockout policies.
    
    REQ-002: User Management
    Administrators shall be able to create, modify, and delete user accounts with appropriate access controls.
  `);
  const [isRequirementsMaximized, setIsRequirementsMaximized] = useState(false);
  const [isSourceMaximized, setIsSourceMaximized] = useState(false);

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

  const toggleRequirementsMaximize = () => {
    setIsRequirementsMaximized(!isRequirementsMaximized);
    setIsSourceMaximized(false);
  };

  const toggleSourceMaximize = () => {
    setIsSourceMaximized(!isSourceMaximized);
    setIsRequirementsMaximized(false);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRequirements(requirements.map(req => req.id));
    } else {
      setSelectedRequirements([]);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedRequirements.length === 0) {
      toast.error("Please select at least one requirement to delete");
      return;
    }
    setRequirements(prevReqs => 
      prevReqs.filter(req => !selectedRequirements.includes(req.id))
    );
    setSelectedRequirements([]);
    toast.success(`Deleted ${selectedRequirements.length} requirements`);
  };

  const handleDeleteRequirement = (requirementId: string) => {
    setRequirements(prevReqs => prevReqs.filter(req => req.id !== requirementId));
    setSelectedRequirements(prev => prev.filter(id => id !== requirementId));
    toast.success("Requirement deleted successfully");
  };

  const handleSourceChange = (requirementId: string, field: 'page' | 'paragraph', value: number) => {
    setRequirements(prevReqs =>
      prevReqs.map(req =>
        req.id === requirementId
          ? {
              ...req,
              source: {
                ...req.source,
                [field]: value
              }
            }
          : req
      )
    );
  };

  const handleBulkStatusChange = (newStatus: "completed" | "needs_review" | "in_progress") => {
    if (selectedRequirements.length === 0) {
      toast.error("Please select at least one requirement");
      return;
    }

    setRequirements(prevReqs =>
      prevReqs.map(req =>
        selectedRequirements.includes(req.id)
          ? { ...req, status: newStatus }
          : req
      )
    );

    toast.success(`Updated status to ${newStatus.replace("_", " ")} for ${selectedRequirements.length} requirements`);
  };

  const handleStatusChange = (requirementId: string, newStatus: "completed" | "needs_review" | "in_progress") => {
    setRequirements(prevReqs =>
      prevReqs.map(req =>
        req.id === requirementId
          ? { ...req, status: newStatus }
          : req
      )
    );
    toast.success(`Status updated to ${newStatus.replace("_", " ")}`);
  };

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      <div 
        className={cn(
          "flex flex-col h-full transition-all duration-300",
          isRequirementsMaximized ? "w-full" : "flex-1",
          isSourceMaximized ? "hidden" : "flex"
        )}
      >
        <div className="p-4 border-b bg-white">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">Requirements Captured</h2>
                <span className="text-sm text-gray-500">
                  Review and edit captured requirements from{" "}
                  {selectedFile?.name || "requirements.pdf"}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleRequirementsMaximize}
              >
                {isRequirementsMaximized ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-2 px-4">
                <Checkbox
                  checked={selectedRequirements.length === requirements.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-500">Select All</span>
              </div>
              <Button 
                onClick={handleAddNewRequirement}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Requirement
              </Button>
              <Button 
                onClick={handleRegenerateSelected}
                disabled={selectedRequirements.length === 0}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate Selected
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    className="bg-blue-500 hover:bg-blue-600"
                    disabled={selectedRequirements.length === 0}
                  >
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Change Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => handleBulkStatusChange("completed")}>
                    Mark as Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleBulkStatusChange("needs_review")}>
                    Mark as Needs Review
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleBulkStatusChange("in_progress")}>
                    Mark as In Progress
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                onClick={handleDeleteSelected}
                disabled={selectedRequirements.length === 0}
                variant="destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
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
                onDelete={() => handleDeleteRequirement(requirement.id)}
                onFunctionalAreaChange={(value) =>
                  setRequirements((prevReqs) =>
                    prevReqs.map((r) =>
                      r.id === requirement.id
                        ? { ...r, functionalArea: value }
                        : r
                    )
                  )
                }
                onSourceChange={(field, value) => handleSourceChange(requirement.id, field, value)}
                onStatusChange={(status) => handleStatusChange(requirement.id, status)}
              />
            ))}
          </div>
        </div>
      </div>

      <div 
        className={cn(
          "border-l flex flex-col bg-gray-50 transition-all duration-300",
          isSourceMaximized ? "w-full" : "w-1/3",
          isRequirementsMaximized ? "hidden" : "flex"
        )}
      >
        <div className="p-4 border-b bg-white flex justify-between items-center">
          <h2 className="text-lg font-semibold">Source Document</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSourceMaximize}
          >
            {isSourceMaximized ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
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
