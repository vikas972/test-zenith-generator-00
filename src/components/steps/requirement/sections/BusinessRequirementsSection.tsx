
import { List, Plus, Pencil, Save, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { type BusinessRequirement } from "../types";

interface BusinessRequirementsSectionProps {
  requirements: BusinessRequirement[];
  onAddClick: () => void;
  onDelete?: (id: string) => void;
}

export const BusinessRequirementsSection = ({ requirements, onAddClick, onDelete }: BusinessRequirementsSectionProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState<string>("");

  const handleSave = (id: string) => {
    toast.success("Business requirement saved successfully");
    setEditingId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <List className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Business Requirements</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onAddClick}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {requirements.map((requirement) => (
          <div key={requirement.id} className="p-2 border rounded">
            <div className="flex items-center justify-between">
              {editingId === requirement.id ? (
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm" onClick={() => handleSave(requirement.id)}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setEditingId(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <span className="font-medium">{requirement.description}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setEditingId(requirement.id);
                        setEditedDescription(requirement.description);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete?.(requirement.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
