
import { List, Plus, Pencil, Save, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { type DataElement } from "../types";

interface DataElementsSectionProps {
  elements: DataElement[];
  onAddClick: () => void;
  onDelete?: (elementId: string) => void;
}

export const DataElementsSection = ({ elements, onAddClick, onDelete }: DataElementsSectionProps) => {
  const [editingElementId, setEditingElementId] = useState<string | null>(null);
  const [editedElementName, setEditedElementName] = useState<string>("");

  const handleElementSave = (elementId: string) => {
    // Here you would typically update the element in the parent component
    toast.success("Element saved successfully");
    setEditingElementId(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <List className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Data Elements</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onAddClick}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {elements.map((element) => (
          <div key={element.id} className="p-2 border rounded">
            <div className="flex items-center justify-between">
              {editingElementId === element.id ? (
                <div className="flex-1 flex items-center gap-2">
                  <Input
                    value={editedElementName}
                    onChange={(e) => setEditedElementName(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="sm" onClick={() => handleElementSave(element.id)}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setEditingElementId(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{element.name}</span>
                    <span className="text-gray-500">({element.type})</span>
                    {element.required && (
                      <span className="text-xs text-red-500">Required</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setEditingElementId(element.id);
                        setEditedElementName(element.name);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete?.(element.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </>
              )}
            </div>
            {!editingElementId && (
              <>
                {element.format && (
                  <div className="text-sm text-gray-600 ml-4">
                    Format: {element.format}
                  </div>
                )}
                {element.validationRules && element.validationRules.length > 0 && (
                  <div className="text-sm text-gray-600 ml-4">
                    Validation Rules:
                    <ul className="list-disc ml-4">
                      {element.validationRules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
