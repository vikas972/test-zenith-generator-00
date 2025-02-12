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
        { id: "f1", description: "User enters credentials" },
        { id: "f2", description: "System validates credentials" }
      ],
      businessRules: [
        { id: "br1", description: "Password must be at least 8 characters" },
        { id: "br2", description: "Account locks after 3 failed attempts" }
      ],
      dataElements: [
        { id: "de1", name: "Username", type: "string", required: true },
        { id: "de2", name: "Password", type: "string", required: true }
      ],
      missingInfo: [
        { id: "mi1", category: "flows", description: "Password reset flow" },
        { id: "mi2", category: "business_rules", description: "2FA requirements" }
      ],
      status: "completed",
      confidence: 0.85,
      source: {
        paragraph: 2,
        page: 1,
        text: "The system shall provide secure authentication mechanisms.",
        startIndex: 50,
        endIndex: 150
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
            onFunctionalAreaChange={(value) =>
              setRequirements((prevReqs) =>
                prevReqs.map((r) =>
                  r.id === req.id
                    ? { ...r, functionalArea: value }
                    : r
                )
              )
            }
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
