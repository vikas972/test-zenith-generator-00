
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Requirement } from "../types";
import { getStatusIcon, getStatusDescription } from "./requirementUtils";

interface RequirementHeaderProps {
  requirement: Requirement;
  editingRequirement: Requirement | null;
  onRequirementClick: (requirement: Requirement, e: React.MouseEvent) => void;
  setEditingRequirement: (requirement: Requirement | null) => void;
}

export const RequirementHeader = ({
  requirement,
  editingRequirement,
  onRequirementClick,
  setEditingRequirement,
}: RequirementHeaderProps) => {
  return (
    <CardHeader 
      className="py-3"
      onClick={(e) => onRequirementClick(requirement, e)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <div className="flex flex-col">
            {editingRequirement?.id === requirement.id ? (
              <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                <Input
                  value={editingRequirement.functionalArea}
                  onChange={(e) =>
                    setEditingRequirement({
                      ...editingRequirement,
                      functionalArea: e.target.value,
                    })
                  }
                  placeholder="Functional Area"
                  className="text-sm"
                />
                <Input
                  value={editingRequirement.actors}
                  onChange={(e) =>
                    setEditingRequirement({
                      ...editingRequirement,
                      actors: e.target.value,
                    })
                  }
                  placeholder="Actors"
                  className="text-xs"
                />
              </div>
            ) : (
              <>
                <CardTitle className="text-sm">
                  {requirement.requirementId}: {requirement.functionalArea}
                </CardTitle>
                <CardDescription className="text-xs">
                  Actor: {requirement.actors}
                </CardDescription>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-xs text-gray-500">
              Page {requirement.source.page}, ¶{requirement.source.paragraph}
            </span>
          </div>
          {getStatusIcon(requirement.status)}
          <Badge
            variant="outline"
            className="text-xs group relative"
          >
            {requirement.status.replace('_', ' ')}
            <span className="invisible group-hover:visible absolute -top-8 left-0 bg-black text-white text-xs p-1 rounded whitespace-nowrap">
              {getStatusDescription(requirement.status)}
            </span>
          </Badge>
        </div>
      </div>
    </CardHeader>
  );
};
