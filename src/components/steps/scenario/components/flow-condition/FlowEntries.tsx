
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

interface FlowEntriesProps {
  entries: Array<{ description: string }>;
  onDeleteEntry: (entryIndex: number) => void;
}

export const FlowEntries = ({ entries, onDeleteEntry }: FlowEntriesProps) => {
  if (!entries.length) return null;

  const handleDeleteEntry = (entryIndex: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    onDeleteEntry(entryIndex);
    toast.success("Entry deleted successfully");
  };

  return (
    <div className="mt-4 space-y-2">
      <h4 className="text-sm font-medium">Entries:</h4>
      <div className="divide-y">
        {entries.map((entry, entryIndex) => (
          <div 
            key={entryIndex} 
            className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-md group"
          >
            <span className="text-gray-600">{entry.description}</span>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
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
