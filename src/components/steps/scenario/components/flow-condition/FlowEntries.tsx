
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface FlowEntriesProps {
  entries: Array<{ description: string }>;
  onDeleteEntry: (entryIndex: number, e: React.MouseEvent) => void;
}

export const FlowEntries = ({ entries, onDeleteEntry }: FlowEntriesProps) => {
  if (!entries.length) return null;

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">Entries:</h4>
      <div className="space-y-2">
        {entries.map((entry, entryIndex) => (
          <div key={entryIndex} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <span>{entry.description}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => onDeleteEntry(entryIndex, e)}
            >
              <Trash2 className="h-3 w-3 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
