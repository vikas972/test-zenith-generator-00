
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
      status: "needs_review",
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
      status: "in_progress",
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
      status: "completed",
      confidence: 0.95,
      source: {
        paragraph: 4,
        page: 1,
        text: "The system must allow users to manage their profile details.",
        startIndex: 230,
        endIndex: 280
      }
    },
    {
      id: "4",
      requirementId: "REQ-004",
      functionalArea: "Access Control",
      description: "System should implement role-based access control",
      actors: ["Admin", "System"],
      flows: [
        { 
          id: "f4", 
          description: "Admin assigns user roles",
          type: "primary",
          steps: [
            {
              id: "s4",
              description: "Admin selects user and role",
              expectedOutcome: "Role is assigned"
            }
          ]
        }
      ],
      businessRules: [
        { 
          id: "br4", 
          description: "Only admins can assign roles",
          category: "security"
        }
      ],
      dataElements: [
        { id: "de4", name: "Role", type: "enum", required: true }
      ],
      integrationPoints: [],
      expectedBehaviors: [],
      missingInfo: [],
      status: "in_progress",
      confidence: 0.88,
      source: {
        paragraph: 5,
        page: 1,
        text: "The system must implement role-based access control for security.",
        startIndex: 290,
        endIndex: 340
      }
    }
  ]);

  const [expandedRequirement, setExpandedRequirement] = useState<string | null>(null);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [editingRequirement, setEditingRequirement] = useState<string | null>(null);
  const [isRequirementsMaximized, setIsRequirementsMaximized] = useState(false);
  const [isSourceMaximized, setIsSourceMaximized] = useState(false);
  const [sourceContent, setSourceContent] = useState(
    "The system shall provide secure user authentication mechanisms.\n\n" +
    "Users must be able to reset their passwords through a secure process.\n\n" +
    "The system must allow users to manage their profile details.\n\n" +
    "The system must implement role-based access control for security."
  );

  const handleRequirementClick = (requirement: Requirement) => {
    setExpandedRequirement(expandedRequirement === requirement.id ? null : requirement.id);
    
    const sourceElement = document.getElementById('source-content');
    if (sourceElement) {
      const text = sourceContent;
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
  };

  const handleDeleteFlow = (flowId: string) => {
    setRequirements(prevReqs => 
      prevReqs.map(req => ({
        ...req,
        flows: req.flows.filter(flow => flow.id !== flowId)
      }))
    );
  };

  const handleDeleteBusinessRule = (ruleId: string) => {
    setRequirements(prevReqs => 
      prevReqs.map(req => ({
        ...req,
        businessRules: req.businessRules.filter(rule => rule.id !== ruleId)
      }))
    );
  };

  const handleDeleteDataElement = (elementId: string) => {
    setRequirements(prevReqs => 
      prevReqs.map(req => ({
        ...req,
        dataElements: req.dataElements.filter(element => element.id !== elementId)
      }))
    );
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
      <div className={cn(
        "flex flex-col h-full transition-all duration-300",
        isRequirementsMaximized ? "w-full" : "flex-1",
        isSourceMaximized ? "hidden" : "flex"
      )}>
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
