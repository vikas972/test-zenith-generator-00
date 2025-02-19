
import { useState } from "react";
import { type Requirement } from "./requirement/types";
import { useToast } from "@/components/ui/use-toast";
import { RequirementsList } from "./requirement/components/RequirementsList";
import { useRequirements } from "./requirement/hooks/useRequirements";

interface ScenarioGenerationProps {
  selectedFile: { id: string; name: string; uploadTime: Date } | null;
}

export const ScenarioGeneration = ({ selectedFile }: ScenarioGenerationProps) => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("requirements");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [selectedDetailedRequirement, setSelectedDetailedRequirement] = useState<Requirement | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const {
    requirements,
    editingRequirement,
    selectedRequirements,
    expandedRequirement,
    handleSelectRequirement,
    handleEditRequirement,
    handleCancelEdit,
    handleSaveRequirement,
    handleRequirementClick,
    handleDeleteRequirement,
    handleSourceChange,
    handleStatusChange,
    handleFunctionalAreaChange,
  } = useRequirements([]);

  const handleCreateRequirement = () => {
    toast({
      title: "Requirement Created",
      description: "New requirement has been successfully created.",
    });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="flex gap-4 h-full">
      <RequirementsList
        requirements={requirements}
        editingRequirement={editingRequirement}
        selectedRequirements={selectedRequirements}
        expandedRequirement={expandedRequirement}
        onSelect={(requirementId, checked) => handleSelectRequirement(requirementId, checked)}
        onEdit={handleEditRequirement}
        onSave={handleSaveRequirement}
        onCancel={handleCancelEdit}
        onClick={handleRequirementClick}
        onDelete={handleDeleteRequirement}
        onFunctionalAreaChange={handleFunctionalAreaChange}
        onSourceChange={handleSourceChange}
        onStatusChange={handleStatusChange}
      />
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
