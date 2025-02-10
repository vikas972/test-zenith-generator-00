
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BookOpen, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RequirementHeader } from "./RequirementHeader";
import { RequirementContent } from "./RequirementContent";
import { Requirement } from "../types";

interface RequirementCardProps {
  requirement: Requirement;
  expandedRequirement: string | null;
  editingRequirement: Requirement | null;
  onEditRequirement: (requirement: Requirement, e: React.MouseEvent) => void;
  onRequirementClick: (requirement: Requirement, e: React.MouseEvent) => void;
  onSaveRequirement: (e: React.MouseEvent) => void;
  setEditingRequirement: (requirement: Requirement | null) => void;
  handleRerunForRequirement: (requirementId: string) => void;
  setIsHistoryOpen: (isOpen: boolean) => void;
}

export const RequirementCard = ({
  requirement,
  expandedRequirement,
  editingRequirement,
  onEditRequirement,
  onRequirementClick,
  onSaveRequirement,
  setEditingRequirement,
  handleRerunForRequirement,
  setIsHistoryOpen,
}: RequirementCardProps) => {
  return (
    <div key={requirement.id}>
      <Card 
        className={cn(
          "mb-2 hover:border-primary cursor-pointer transition-colors",
          expandedRequirement === requirement.id && "border-primary"
        )}
      >
        <RequirementHeader
          requirement={requirement}
          editingRequirement={editingRequirement}
          onRequirementClick={onRequirementClick}
          setEditingRequirement={setEditingRequirement}
        />

        {expandedRequirement === requirement.id && (
          <RequirementContent
            requirement={requirement}
            editingRequirement={editingRequirement}
            onEditRequirement={onEditRequirement}
            onSaveRequirement={onSaveRequirement}
            setEditingRequirement={setEditingRequirement}
            handleRerunForRequirement={handleRerunForRequirement}
            setIsHistoryOpen={setIsHistoryOpen}
          />
        )}
      </Card>
    </div>
  );
};
