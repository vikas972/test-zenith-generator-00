
import { useState } from "react";
import { List, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type DataElement } from "../types";
import { toast } from "sonner";

interface DataElementsSectionProps {
  elements: DataElement[];
  onAddElement: (element: DataElement) => void;
  onUpdateElement: (elementId: string, updatedElement: DataElement) => void;
}

export const DataElementsSection = ({ elements, onAddElement, onUpdateElement }: DataElementsSectionProps) => {
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const renderElementDetails = (element: DataElement) => (
    <div className="ml-4 mt-2 space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <Badge variant={element.required ? "destructive" : "secondary"}>
          {element.required ? "Required" : "Optional"}
        </Badge>
        <Badge variant="outline">{element.type}</Badge>
        {element.format && <Badge variant="outline">{element.format}</Badge>}
      </div>
      {element.validationRules && (
        <div className="text-gray-600">
          <span className="font-medium">Validation:</span>
          <ul className="list-disc ml-4">
            {element.validationRules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>
      )}
      {element.dependencies && (
        <div className="text-gray-600">
          <span className="font-medium">Dependencies:</span> {element.dependencies.join(", ")}
        </div>
      )}
      {element.constraints && (
        <div className="text-gray-600">
          <span className="font-medium">Constraints:</span>
          <ul className="list-disc ml-4">
            {element.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <List className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Data Elements</h3>
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => {
            const newElement: DataElement = {
              id: `de${elements.length + 1}`,
              name: "New Element",
              type: "string",
              required: false
            };
            onAddElement(newElement);
            toast.success("New data element added");
          }}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        {elements.map((element) => (
          <div key={element.id} className="group border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{element.name}</span>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100"
                onClick={() => setEditingItemId(element.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
            {renderElementDetails(element)}
          </div>
        ))}
      </div>
    </div>
  );
};
