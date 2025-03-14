
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
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

  return (
    <div className="space-y-2 mt-4">
      <h4 className="text-sm font-medium">Entries</h4>
      <div className="divide-y">
        {entries.map((entry, entryIndex) => (
          <div 
            key={entryIndex} 
            className="flex items-center justify-between py-2"
          >
            <div className="flex-1 mr-2">
              <EditableField
                isEditing={isEditing && editingEntryIndex === entryIndex}
                value={entry.description}
                editedValue={editingEntryIndex === entryIndex ? editedValue : entry.description}
                width="w-full"
                onEdit={() => onEdit?.(entryIndex, entry.description)}
                onSave={onSaveEdit}
                onCancel={onCancelEdit}
                onChange={onEditingChange}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteEntry(entryIndex);
              }}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
