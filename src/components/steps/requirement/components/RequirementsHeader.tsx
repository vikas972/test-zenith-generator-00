
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { LayoutGrid, Maximize2, Minimize2 } from "lucide-react";

interface RequirementsHeaderProps {
  fileName: string | undefined;
  isMaximized: boolean;
  selectedCount: number;
  totalCount: number;
  onSelectAll: (checked: boolean) => void;
  onAddNew: () => void;
  onRegenerate: () => void;
  onBulkStatusChange: (status: "completed" | "needs_review" | "in_progress") => void;
  onDelete: () => void;
  onToggleMaximize: () => void;
  onShowGrid: () => void; // Added new prop
}

export const RequirementsHeader = ({
  fileName,
  isMaximized,
  selectedCount,
  totalCount,
  onSelectAll,
  onAddNew,
  onRegenerate,
  onBulkStatusChange,
  onDelete,
  onToggleMaximize,
  onShowGrid, // Added new prop
}: RequirementsHeaderProps) => {
  return (
    <div className="flex items-center gap-2 p-4 border-b">
      <div className="flex items-center gap-2 flex-1">
        <Checkbox
          checked={selectedCount === totalCount && totalCount > 0}
          onCheckedChange={onSelectAll}
        />
        <span className="font-medium truncate">
          {fileName ? `Requirements: ${fileName}` : "Requirements"}
        </span>
        <span className="text-xs text-muted-foreground">
          {selectedCount > 0 ? `${selectedCount} of ${totalCount} selected` : `${totalCount} requirements`}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onShowGrid}
          className="flex items-center gap-2"
        >
          <LayoutGrid className="h-4 w-4" />
          Grid View
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddNew}
        >
          Add New
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerate}
        >
          Regenerate
        </Button>
        {selectedCount > 0 && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                >
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onBulkStatusChange("completed")}>
                  Mark as Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkStatusChange("in_progress")}>
                  Mark as In Progress
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkStatusChange("needs_review")}>
                  Mark as Needs Review
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete}
            >
              Delete
            </Button>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleMaximize}
        >
          {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};
