import { useState } from "react";
import { RequirementCard } from "./requirement/RequirementCard";
import { type Requirement } from "./requirement/types";
import { useToast } from "@/components/ui/use-toast";

interface ScenarioGenerationProps {
  selectedFile: { id: string; name: string; uploadTime: Date } | null;
}

export const ScenarioGeneration = ({ selectedFile }: ScenarioGenerationProps) => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("requirements");
  const [editingRequirement, setEditingRequirement] = useState<string | null>(null);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [expandedRequirement, setExpandedRequirement] = useState<string | null>(null);
  const [selectedDetailedRequirement, setSelectedDetailedRequirement] = useState<Requirement | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

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
          type: "primary"
        },
        { 
          id: "f2", 
          description: "System validates credentials",
          type: "primary"
        }
      ],
      businessRules: [
        { 
          id: "br1", 
          description: "Password must be at least 8 characters",
          category: "authentication"
        },
        { 
          id: "br2", 
          description: "Account locks after 3 failed attempts",
          category: "security"
        }
      ],
      dataElements: [
        { id: "de1", name: "Username", type: "string", required: true },
        { id: "de2", name: "Password", type: "string", required: true }
      ],
      integrationPoints: [],
      expectedBehaviors: [],
      missingInfo: [
        { id: "mi1", category: "flows", description: "Password reset flow" }
      ],
      status: "in_progress",
      confidence: 0.85,
      source: {
        paragraph: 2,
        page: 1,
        text: "The system shall provide secure authentication mechanisms.",
        startIndex: 50,
        endIndex: 150
      }
    },
    {
      id: "2",
      requirementId: "REQ-002",
      functionalArea: "User Profile Management",
      description: "Users should be able to update their profile information",
      actors: ["End User"],
      flows: [
        { 
          id: "f3", 
          description: "User navigates to profile section",
          type: "primary"
        },
        { 
          id: "f4", 
          description: "User updates profile information",
          type: "primary"
        }
      ],
      businessRules: [
        { 
          id: "br3", 
          description: "Email address must be unique",
          category: "system"
        }
      ],
      dataElements: [
        { id: "de3", name: "Email", type: "string", required: true },
        { id: "de4", name: "Phone", type: "string", required: false }
      ],
      integrationPoints: [],
      expectedBehaviors: [],
      missingInfo: [],
      status: "completed",
      confidence: 0.9,
      source: {
        paragraph: 3,
        page: 1,
        text: "Users should have the ability to manage their profile information.",
        startIndex: 160,
        endIndex: 220
      }
    },
    {
      id: "3",
      requirementId: "REQ-003",
      functionalArea: "Password Reset",
      description: "System should provide password reset functionality",
      actors: ["End User", "System"],
      flows: [
        { 
          id: "f5", 
          description: "User requests password reset",
          type: "primary"
        },
        { 
          id: "f6", 
          description: "User receives reset email",
          type: "primary"
        }
      ],
      businessRules: [
        { 
          id: "br4", 
          description: "Reset link expires after 24 hours",
          category: "security"
        }
      ],
      dataElements: [
        { id: "de5", name: "Reset Token", type: "string", required: true }
      ],
      integrationPoints: [],
      expectedBehaviors: [],
      missingInfo: [],
      status: "needs_review",
      confidence: 0.75,
      source: {
        paragraph: 4,
        page: 1,
        text: "The system must provide a secure way to reset passwords.",
        startIndex: 230,
        endIndex: 280
      }
    },
    {
      id: "4",
      requirementId: "REQ-004",
      functionalArea: "Session Management",
      description: "System should handle user sessions securely",
      actors: ["System"],
      flows: [
        { 
          id: "f7", 
          description: "System creates session after login",
          type: "primary"
        },
        { 
          id: "f8", 
          description: "System invalidates session after timeout",
          type: "exception"
        }
      ],
      businessRules: [
        { 
          id: "br5", 
          description: "Session timeout after 30 minutes of inactivity",
          category: "security"
        }
      ],
      dataElements: [
        { id: "de6", name: "Session Token", type: "string", required: true },
        { id: "de7", name: "Last Activity", type: "timestamp", required: true }
      ],
      integrationPoints: [],
      expectedBehaviors: [],
      missingInfo: [],
      status: "in_progress",
      confidence: 0.8,
      source: {
        paragraph: 5,
        page: 1,
        text: "The system must implement secure session management.",
        startIndex: 290,
        endIndex: 340
      }
    }
  ]);

  const handleCreateRequirement = () => {
    toast({
      title: "Requirement Created",
      description: "New requirement has been successfully created.",
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditRequirement = (requirement: Requirement, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRequirement(requirement.id);
    setExpandedRequirement(requirement.id);
  };

  const handleSaveRequirement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRequirement(null);
    toast({
      title: "Requirement Updated",
      description: "The requirement has been successfully updated.",
    });
  };

  const handleRerunForRequirement = (requirementId: string) => {
    toast({
      title: "Regenerating Scenarios",
      description: `Regenerating scenarios for requirement ${requirementId}...`,
    });
  };

  const handleRequirementClick = (req: Requirement) => {
    setExpandedRequirement(expandedRequirement === req.id ? null : req.id);
  };

  const handleDeleteRequirement = (requirementId: string) => {
    setRequirements(prevReqs => prevReqs.filter(req => req.id !== requirementId));
    setSelectedRequirements(prev => prev.filter(id => id !== requirementId));
    toast({
      title: "Requirement Deleted",
      description: "The requirement has been successfully deleted.",
    });
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

  const handleStatusChange = (requirementId: string, newStatus: "completed" | "needs_review" | "in_progress") => {
    setRequirements(prevReqs =>
      prevReqs.map(req =>
        req.id === requirementId
          ? { ...req, status: newStatus }
          : req
      )
    );
    toast({
      title: "Status Updated",
      description: `Status changed to ${newStatus.replace("_", " ")}`
    });
  };

  const handleUpdateRequirementFlows = (requirementId: string, flows: Requirement['flows']) => {
    setRequirements(prevReqs =>
      prevReqs.map(req =>
        req.id === requirementId
          ? { ...req, flows }
          : req
      )
    );
  };

  const handleUpdateRequirementBusinessRules = (requirementId: string, rules: Requirement['businessRules']) => {
    setRequirements(prevReqs =>
      prevReqs.map(req =>
        req.id === requirementId
          ? { ...req, businessRules: rules }
          : req
      )
    );
  };

  const handleUpdateRequirementDataElements = (requirementId: string, elements: Requirement['dataElements']) => {
    setRequirements(prevReqs =>
      prevReqs.map(req =>
        req.id === requirementId
          ? { ...req, dataElements: elements }
          : req
      )
    );
  };

  return (
    <div className="flex gap-4 h-full">
      <div className="flex-1 overflow-auto">
        {requirements.map((req) => (
          <RequirementCard
            key={req.id}
            requirement={req}
            isExpanded={expandedRequirement === req.id}
            isEditing={editingRequirement === req.id}
            isSelected={selectedRequirements.includes(req.id)}
            onToggleSelect={(checked) => {
              setSelectedRequirements(prev =>
                checked
                  ? [...prev, req.id]
                  : prev.filter(id => id !== req.id)
              );
            }}
            onEdit={(e) => handleEditRequirement(req, e)}
            onSave={handleSaveRequirement}
            onCancel={(e) => {
              e.stopPropagation();
              setEditingRequirement(null);
            }}
            onClick={() => handleRequirementClick(req)}
            onDelete={() => handleDeleteRequirement(req.id)}
            onFunctionalAreaChange={(value) => {
              setRequirements((prevReqs) =>
                prevReqs.map((r) =>
                  r.id === req.id
                    ? { ...r, functionalArea: value }
                    : r
                )
              );
            }}
            onSourceChange={(field, value) => handleSourceChange(req.id, field, value)}
            onStatusChange={(status) => handleStatusChange(req.id, status)}
          />
        ))}
      </div>
      <div className="w-1/3 border-l p-4">
        <div className="prose prose-sm">
          <h3 className="text-lg font-semibold mb-4">Source Document</h3>
          <div className="whitespace-pre-wrap text-sm">
            {/* Source content would go here */}
          </div>
        </div>
      </div>
    </div>
  );
};
