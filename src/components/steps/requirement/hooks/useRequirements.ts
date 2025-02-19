
import { useState } from "react";
import { toast } from "sonner";
import { type Requirement } from "../types";

export const useRequirements = (initialRequirements: Requirement[] = []) => {
  const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements);
  const [editingRequirement, setEditingRequirement] = useState<string | null>(null);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [expandedRequirement, setExpandedRequirement] = useState<string | null>(null);

  const handleSelectRequirement = (requirementId: string, checked: boolean) => {
    setSelectedRequirements(prev =>
      checked
        ? [...prev, requirementId]
        : prev.filter(id => id !== requirementId)
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRequirements(requirements.map(req => req.id));
    } else {
      setSelectedRequirements([]);
    }
  };

  const handleEditRequirement = (requirement: Requirement, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRequirement(requirement.id);
  };

  const handleSaveRequirement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRequirement(null);
    toast.success("Changes saved successfully");
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRequirement(null);
  };

  const handleDeleteRequirement = (requirementId: string) => {
    setRequirements(prevReqs => prevReqs.filter(req => req.id !== requirementId));
    setSelectedRequirements(prev => prev.filter(id => id !== requirementId));
    toast.success("Requirement deleted successfully");
  };

  const handleBulkDelete = () => {
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

  const handleRequirementClick = (requirement: Requirement) => {
    setExpandedRequirement(expandedRequirement === requirement.id ? null : requirement.id);
  };

  const handleFunctionalAreaChange = (requirementId: string, value: string) => {
    setRequirements(prevReqs =>
      prevReqs.map(req =>
        req.id === requirementId
          ? { ...req, functionalArea: value }
          : req
      )
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

  return {
    requirements,
    setRequirements,
    editingRequirement,
    selectedRequirements,
    setSelectedRequirements,  // Added this line
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
    handleSourceChange
  };
};
