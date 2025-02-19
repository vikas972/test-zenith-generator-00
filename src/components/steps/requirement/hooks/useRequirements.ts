
import { useState } from "react";
import { type Requirement } from "../types";
import { useToast } from "@/components/ui/use-toast";

export const useRequirements = (initialRequirements: Requirement[]) => {
  const { toast } = useToast();
  const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements);
  const [editingRequirement, setEditingRequirement] = useState<string | null>(null);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [expandedRequirement, setExpandedRequirement] = useState<string | null>(null);

  const handleEditRequirement = (requirement: Requirement, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRequirement(requirement.id);
    setExpandedRequirement(requirement.id);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRequirement(null);
  };

  const handleSaveRequirement = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingRequirement(null);
    toast({
      title: "Requirement Updated",
      description: "The requirement has been successfully updated.",
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

  const handleFunctionalAreaChange = (requirementId: string, value: string) => {
    setRequirements(prevReqs =>
      prevReqs.map(r =>
        r.id === requirementId
          ? { ...r, functionalArea: value }
          : r
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

  return {
    requirements,
    editingRequirement,
    selectedRequirements,
    expandedRequirement,
    setSelectedRequirements,
    handleEditRequirement,
    handleCancelEdit,
    handleSaveRequirement,
    handleRequirementClick,
    handleDeleteRequirement,
    handleSourceChange,
    handleStatusChange,
    handleFunctionalAreaChange,
    handleUpdateRequirementFlows,
    handleUpdateRequirementBusinessRules,
    handleUpdateRequirementDataElements,
  };
};
