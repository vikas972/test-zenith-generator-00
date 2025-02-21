
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { EditableField } from "./EditableField";

interface FlowEntriesProps {
  entries: Array<{ description: string }>;
  onDeleteEntry: (entryIndex: number) => void;
  isEditing: (field: string) => boolean;
  onEdit: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
  editedValue: string;
}

export const FlowEntries = ({ 
  entries, 
  onDeleteEntry,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onChange,
  editedValue
}: FlowEntriesProps) => {
  if (!entries.length) return null;

  const handleDeleteEntry = (entryIndex: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    onDeleteEntry(entryIndex);
    toast.success("Entry deleted successfully");
  };

  return (
    <div className="space-y-2 mt-4">
      <h4 className="text-sm font-medium">Entries</h4>
      <div className="divide-y">
        {entries.map((entry, entryIndex) => (
          <div 
            key={entryIndex} 
            className="flex items-center justify-between py-2 group"
          >
            <div className="flex-1 mr-2">
              <EditableField
                isEditing={isEditing(`entry-${entryIndex}`)}
                value={entry.description}
                editedValue={editedValue}
                width="w-full"
                onEdit={() => onEdit(`entry-${entryIndex}`, entry.description)}
                onSave={onSave}
                onCancel={onCancel}
                onChange={onChange}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 flex-shrink-0"
              onClick={(e) => handleDeleteEntry(entryIndex, e)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
