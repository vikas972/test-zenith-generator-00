import { useState } from "react";
import { RequirementCard } from "./requirement/RequirementCard";
import { type Requirement, type Scenario } from "./requirement/types";
import { useToast } from "@/components/ui/use-toast";

interface ScenarioGenerationProps {
  selectedFile: { id: string; name: string; uploadTime: Date } | null;
}

export const ScenarioGeneration = ({ selectedFile }: ScenarioGenerationProps) => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("requirements");
  const [editingRequirement, setEditingRequirement] = useState<Requirement | null>(null);
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
      actors: "End User",
      flows: [
        "User provides credentials",
        "System validates credentials",
        "System grants access"
      ],
      businessRules: [
        "Password must be at least 8 characters",
        "Account locks after 3 failed attempts"
      ],
      validations: [
        "Email format validation",
        "Password complexity check"
      ],
      dataElements: [
        { name: "Email", type: "string", required: true },
        { name: "Password", type: "string", required: true }
      ],
      status: "complete",
      missingInfo: ["Password reset process details"],
      dependencies: ["REQ-005"],
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
      actors: "Administrator",
      flows: [
        "Admin accesses user management",
        "System displays user list",
        "Admin performs user operations"
      ],
      businessRules: [
        "Only admins can manage users",
        "User deletion requires confirmation"
      ],
      validations: [
        "Admin role verification",
        "User data validation"
      ],
      dataElements: [
        { name: "Username", type: "string", required: true },
        { name: "Role", type: "enum", required: true }
      ],
      status: "needs_review",
      source: {
        paragraph: 3,
        page: 1,
        text: "Administrators shall be able to create, modify, and delete user accounts with appropriate access controls.",
        startIndex: 151,
        endIndex: 250
      }
    }
  ]);

  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: "1",
      name: "Basic User Authentication Flow",
      description: "Verify user login with valid credentials",
      coverage: 85,
      requirements: ["REQ-001"],
      details: "Test basic user authentication flow",
      status: "Ready",
      conditions: ["Valid credentials", "Active user account"],
      confidenceScore: 0.9
    },
    {
      id: "2",
      name: "Failed Login Attempts",
      description: "Verify account lockout after multiple failed attempts",
      coverage: 90,
      requirements: ["REQ-001"],
      details: "Test account lockout functionality",
      status: "Ready",
      conditions: ["Invalid credentials", "Multiple attempts"],
      confidenceScore: 0.85
    }
  ]);

  const [sourceContent, setSourceContent] = useState<string>(`
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    
    REQ-001: User Authentication
    The system shall provide secure user authentication mechanisms including password validation and account lockout policies.
    
    REQ-002: User Management
    Administrators shall be able to create, modify, and delete user accounts with appropriate access controls.
    
    REQ-003: Payment Processing
    The system must handle secure payment transactions with proper validation and error handling.
    
    REQ-004: Reporting
    Generate comprehensive reports for system activities and user transactions.
  `);

  const handleCreateRequirement = () => {
    toast({
      title: "Requirement Created",
      description: "New requirement has been successfully created.",
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditRequirement = (requirement: Requirement, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRequirement(requirement);
    setExpandedRequirement(requirement.id);
  };

  const handleSaveRequirement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingRequirement) {
      setRequirements(requirements.map(req => 
        req.id === editingRequirement.id ? editingRequirement : req
      ));
      setEditingRequirement(null);
      toast({
        title: "Requirement Updated",
        description: "The requirement has been successfully updated.",
      });
    }
  };

  const handleRerunForRequirement = (requirementId: string) => {
    toast({
      title: "Regenerating Scenarios",
      description: `Regenerating scenarios for requirement ${requirementId}...`,
    });
  };

  const handleRequirementClick = (req: Requirement, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedRequirement(expandedRequirement === req.id ? null : req.id);
    // Highlight source text
    const sourceElement = document.getElementById('source-content');
    if (sourceElement) {
      const text = sourceElement.innerHTML;
      const highlightedText = text.slice(0, req.source.startIndex) +
        `<mark class="bg-primary/20">${text.slice(req.source.startIndex, req.source.endIndex)}</mark>` +
        text.slice(req.source.endIndex);
      sourceElement.innerHTML = highlightedText;
    }
  };

  return (
    <div className="flex gap-4 h-full">
      <div className="flex-1 overflow-auto">
        {requirements.map((req) => (
          <RequirementCard
            key={req.id}
            requirement={req}
            expandedRequirement={expandedRequirement}
            editingRequirement={editingRequirement}
            onEditRequirement={handleEditRequirement}
            onRequirementClick={handleRequirementClick}
            onSaveRequirement={handleSaveRequirement}
            setEditingRequirement={setEditingRequirement}
            handleRerunForRequirement={handleRerunForRequirement}
            setIsHistoryOpen={setIsHistoryOpen}
          />
        ))}
      </div>
      <div className="w-1/3 border-l p-4">
        <div className="prose prose-sm">
          <h3 className="text-lg font-semibold mb-4">Source Document</h3>
          <div
            id="source-content"
            className="whitespace-pre-wrap text-sm"
            dangerouslySetInnerHTML={{ __html: sourceContent }}
          />
        </div>
      </div>
    </div>
  );
};
