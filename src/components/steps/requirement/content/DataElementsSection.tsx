
import { List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type DataElement } from "../types";
import { toast } from "sonner";

interface DataElementsSectionProps {
  elements: DataElement[];
  onAddElement: () => void;
}

export const DataElementsSection = ({ elements, onAddElement }: DataElementsSectionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <List className="h-4 w-4" />
          <h3 className="text-sm font-semibold">Data Elements</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={() => {
          onAddElement();
          toast.success("New data element added");
        }}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {elements.map((element) => (
          <div key={element.id} className="text-sm space-y-2 border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{element.name}</span>
              <div className="flex items-center gap-2">
                <Badge variant={element.required ? "destructive" : "secondary"}>
                  {element.required ? "Required" : "Optional"}
                </Badge>
                <Badge variant="outline">{element.type}</Badge>
              </div>
            </div>
            
            {element.format && (
              <div className="text-xs text-gray-600">
                Format: {element.format}
              </div>
            )}
            
            {element.validations && element.validations.length > 0 && (
              <div className="text-xs text-gray-600">
                <div className="font-medium mb-1">Validation Rules:</div>
                <ul className="list-disc list-inside">
                  {element.validations.map((validation, index) => (
                    <li key={index}>
                      {validation.rule} - {validation.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {element.dependencies && element.dependencies.length > 0 && (
              <div className="text-xs text-gray-600">
                <div className="font-medium mb-1">Dependencies:</div>
                <ul className="list-disc list-inside">
                  {element.dependencies.map((dep, index) => (
                    <li key={index}>{dep}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {element.constraints && element.constraints.length > 0 && (
              <div className="text-xs text-gray-600">
                <div className="font-medium mb-1">Constraints:</div>
                <ul className="list-disc list-inside">
                  {element.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
