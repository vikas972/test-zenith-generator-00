
import { Button } from "@/components/ui/button";
import { Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";
import { EditableField } from "./EditableField";

interface FlowEntriesProps {
  entries: Array<{ description: string }>;
  onDeleteEntry: (entryIndex: number) => void;
  isEditing?: boolean;
  onEdit?: (entryIndex: number, value: string) => void;
  editedValue?: string;
  editingEntryIndex?: number;
  onSaveEdit?: () => void;
  onCancelEdit?: () => void;
  onEditingChange?: (value: string) => void;
}

export const FlowEntries = ({ 
  entries, 
  onDeleteEntry,
  isEditing,
  onEdit,
  editedValue,
  editingEntryIndex,
  onSaveEdit,
  onCancelEdit,
  onEditingChange
}: FlowEntriesProps) => {
  if (!entries.length) return null;

  const handleDeleteEntry = (entryIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteEntry(entryIndex);
    toast.success("Entry deleted successfully");
  };

  const handleEntryEdit = (entryIndex: number, value: string) => {
    if (onEdit) {
      onEdit(entryIndex, value);
    }
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
                isEditing={isEditing}
                value={entry.description}
                editedValue={editedValue || entry.description}
                width="w-full"
                onEdit={() => handleEntryEdit(entryIndex, entry.description)}
                onSave={onSaveEdit}
                onCancel={onCancelEdit}
                onChange={onEditingChange}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 flex-shrink-0"
                onClick={(e) => handleDeleteEntry(entryIndex, e)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
